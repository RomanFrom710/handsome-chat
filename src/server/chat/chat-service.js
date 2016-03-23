var messageRepository = require('./message/message-repository');
var config = require('../config');
var _ = require('lodash');

exports.post = function (message, userId) {
    return messageRepository.post(message, userId);
};

exports.getLastMessages = function () {
    var messagesCount = config.application.lastMessagesCount;
    return messageRepository.getLastMessages(messagesCount);
};


var onlineUsers = [];

exports.addConnectedUser = function (user) {
    onlineUsers.push(user);
};

exports.removeConnectedUser = function (id) {
    _.remove(onlineUsers, { id: id });
};

exports.getOnlineUsers = function () {
    return onlineUsers.slice();
};