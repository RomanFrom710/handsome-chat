var Message = require('./message-model');

exports.post = post;
exports.getLastMessages = getLastMessages;

function post(content, userId, roomId) {
    return Message.create({
        content: content,
        //todo: uncomment when rooms will be implemented on client
        //room: roomId,
        author: userId
    });
}

function getLastMessages(roomId, messagesCount) {
    return Message
        .find()
        .where('room').equals(roomId)
        .limit(messagesCount)
        .sort('-created');
}