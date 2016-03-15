var Message = require('./message-model');

exports.post = post;
exports.getLastMessages = getLastMessages;

function post(content, userId) {
    return Message.create({
        content: content,
        author: userId
    });
}

function getLastMessages(messagesCount) {
    return Message
        .find()
        .limit(messagesCount)
        .sort('-created');
}