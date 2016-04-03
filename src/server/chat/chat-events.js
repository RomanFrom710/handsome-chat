'use strict';

var userService = require('../user/user-service');
var chatService = require('./chat-service');
var _ = require('lodash');

module.exports = initChatEvents;

function initChatEvents (io, socket, userId) {
    socket.on('message', function (message) {
        message.content = _.trim(message.content);
        if (!message) {
            return;
        }

        userService.findById(userId)
            .then(function (user) {
                message.author = _.pick(user, ['id', 'name']);
                message.created = new Date();
                io.emit('message', message);
            });

        chatService.post(message.content, userId);
    });
}