'use strict';

module.exports = function () {
    var result = [];

    result.push({
        name: 'First message date',
        value: db.messages
            .findOne()
            .created.toLocaleString()
    });

    var messageLengthCollection = 'messagesLength';  // There is no $strlen operator in mongo, so we need to save it :<
    db.messages
        .mapReduce(
            function () {
                emit(this._id, this.content.length);
            },
            function (key, values) {
                return values;
            },
            { out: messageLengthCollection }
        );

    result.push({
        name: 'The longest message length',
        value: db.getCollection(messageLengthCollection)
            .find()
            .sort({ value: -1 })
            .limit(1)
            .toArray()[0]
            .value
    });

    return result;
};
