var session = require('./session-init');
var chatService = require('../chat/chat-service');
var userService = require('../user/user-service');
var _ = require('lodash');

module.exports = initSocket;

function initSocket(server) {
    var io = require('socket.io')(server);

    io.use(function (socket, next) {
        session(socket.request, {}, next);
    });

    io.on('connection', function (socket) {
        console.log('connected');

        socket.on('disconnect', function () {
            console.log('disconnect');
        });

        socket.on('message', function (message) {
            var userId = getUserId(socket);
            if (!userId) {
                return;
            }

            userService.findById(userId)
                .then(function (user) {
                    message.author = _.pick(user, ['id', 'name']);
                    io.emit('message', message);
                });

            chatService.post(message.content, userId);
        });
    });

    function getUserId(socket) {
        var passport = socket.request.session.passport;
        if (passport && passport.user) {
            return passport.user;
        }
        return null;
    }
}