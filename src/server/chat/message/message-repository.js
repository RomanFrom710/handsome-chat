'use strict';

var Message = require('./message-model');
var _ = require('lodash');

exports.post = function (content, userId) {
    return Message.create({
        content: content,
        author: userId
    });
};

exports.getLastMessages = function (messagesCount) {
    return Message
        .find()
        .limit(messagesCount)
        .sort('-created')
        .select('-_id') // For now we don't need message id anywhere
        .populate('author', 'id name')
        .then(function (messages) {
            return _.reverse(messages); // Finally messages should be sorted asc
        });
};
