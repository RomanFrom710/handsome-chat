'use strict';

var Message = require('./message-model');
var _ = require('lodash');

exports.post = function (messageDto) {
    return Message.create({
        content: messageDto.content,
        author: messageDto.userId,
        image: messageDto.image
    });
};

exports.getLastMessages = function (messagesCount) {
    return Message
        .find()
        .limit(messagesCount)
        .sort('-created')
        .select('-_id') // For now we don't need message id anywhere
        .populate('author', 'id name')
        .lean()
        .then(function (messages) {
            _.forEach(messages, function (message) {
                message.author.id = message.author._id; // todo: fuck mongoose I HATE IT
            });
            return _.reverse(messages); // Finally messages should be sorted asc
        });
};
