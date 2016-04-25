'use strict';

var userService = require('../user/user-service');
var chatService = require('./chat-service');
var galleryService = require('../gallery/gallery-service');
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
        
        var messageDto = {
            content: message.content,
            userId: userId
        };
        chatService.post(messageDto);
    });

    socket.on('image', function (imageId) {
        var imageQuery = {
            userId: userId,
            imageId: imageId,
            currentUserId: userId
        };

        galleryService.getImage(imageQuery)
            .then(function (image) {
                var messageDto = {
                    image: {
                        id: imageId,
                        previewUrl: image.previewUrl
                    },
                    author: image.author
                };
                io.emit('message', messageDto);

                messageDto.userId = messageDto.author.id;
                chatService.post(messageDto);
            });
    });
}