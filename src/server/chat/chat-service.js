var messageRepository = require('./message/message-repository');
var config = require('../config');

exports.post = post;
exports.getLastMessages = getLastMessages;

function post(message, userId) {
    return messageRepository.post(message, userId);
}

function getLastMessages() {
    var messagesCount = config.application.lastMessagesCount;
    return messageRepository.getLastMessages(messagesCount);
}