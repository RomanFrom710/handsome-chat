var messageRepository = require('./message/message-repository');

exports.post = post;

function post(message, userId) {
    return messageRepository.post(message, userId);
}