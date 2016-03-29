var userService = require('./user-service');
var chatService = require('../chat/chat-service');
var _ = require('lodash');

module.exports = initUserEvents;

function initUserEvents (io, socket, userId) {
    userService.findById(userId)
        .then(function (user) {
            var userDto = _.pick(user, ['id', 'name']);
            chatService.addConnectedUser(userDto);
            io.emit('joined', userDto);
        });

    socket.on('disconnect', function () {
        chatService.removeConnectedUser(userId);
        io.emit('left', userId);
    });
}