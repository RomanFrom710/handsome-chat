var messageRepository = require('./message/message-repository');
var config = require('../config');

exports.post = function (message, userId) {
    return messageRepository.post(message, userId);
};

exports.getLastMessages = function () {
    var messagesCount = config.application.lastMessagesCount;
    return messageRepository.getLastMessages(messagesCount);
};
