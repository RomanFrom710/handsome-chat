var session = require('./session-init');
var userEventsInit = require('../user/user-events');
var chatEventsInit = require('../chat/chat-events');

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
        var userId = getUserId(socket);
        userEventsInit(io, socket, userId);
        chatEventsInit(io, socket, userId);
    });
}

function getUserId(socket) {
    var passport = socket.request.session.passport;
    if (passport && passport.user) {
        return passport.user;
    }
    return null;
}