var messageRepository = require('./message/message-repository');

exports.post = post;

function post(message, userId, roomId) {
    messageRepository.post(message, userId, roomId);
}