var session = require('./session-init');
var chatService = require('../chat/chat-service');
var userService = require('../user/user-service');
var _ = require('lodash');

// todo: this file should be refactored
module.exports = initSocket;

function initSocket(server) {
    var io = require('socket.io')(server);

    io.use(function (socket, next) {
        session(socket.request, {}, next);
    });

    io.use(function (socket, next) {
        if (getUserId(socket)) {
            next();
        } else {
            next(new Error('Not authorized'));
        }
    });

    io.on('connection', function (socket) {
        console.log('connected');

        var userId = getUserId(socket);
        userService.findById(userId)
            .then(function (user) {
                var userDto = _.pick(user, ['id', 'name']);
                chatService.addConnectedUser(userDto);
                io.emit('joined', userDto);
            });

        socket.on('disconnect', function () {
            chatService.removeConnectedUser(userId);
            io.emit('left', userId);
            console.log('disconnect');
        });

        socket.on('message', function (message) {
            userService.findById(userId)
                .then(function (user) {
                    message.author = _.pick(user, ['id', 'name']);
                    message.created = new Date();
                    io.emit('message', message);
                });

            chatService.post(message.content, userId);
        });
    });
}

function getUserId(socket) {
    var passport = socket.request.session.passport;
    if (passport && passport.user) {
        return passport.user;
    }
    return null;
}