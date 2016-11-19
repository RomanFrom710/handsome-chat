'use strict';

module.exports = function () {
    var result = [];
    var wordsCollection = 'wordsStatistics';
    var statisticsCacheCollection = 'statisticsCache';
    var cachePeriod = 24 * 60 * 60 * 1000; // 1 day in ms

    var lastStatistics = db.getCollection(statisticsCacheCollection)
        .find()
        .sort({ created: -1 })
        .limit(1)[0];

    if (lastStatistics) {
        var timeSpanFromLastValue = (new Date()).getTime() -lastStatistics.created.getTime();
        if (timeSpanFromLastValue < cachePeriod) {
            return lastStatistics.statistics;
        }
    }

    result.push({
        name: 'First message date',
        value: db.messages
            .findOne()
            .created.toLocaleString()
    });

    db.messages.find().snapshot().forEach(function (message) {
        if (!message.content) {
            return;
        }

        var words = message.content.split(' ').filter(function (word) {
            return word.length > 0;
        });

        db.getCollection(wordsCollection).insert({
            words: words,
            messageLength: message.content.length,
            messageId: message._id,
            userId: message.author
        });
    });


    var wordsCount = db.getCollection(wordsCollection)
        .aggregate([
            { $project: { wordsCount: { $size: '$words' } } },
            { $group: {
                _id: null,
                count: { $sum: '$wordsCount' },
                avg: { $avg: '$wordsCount' }
            } }
        ])._batch[0];

    result.push({
        name: 'Total words count',
        value: wordsCount.count
    });
    result.push({
        name: 'Average words count in a message',
        value: wordsCount.avg.toFixed(2)
    });


    var messageLength = db.getCollection(wordsCollection)
        .aggregate([
            { $group: {
                _id: null,
                max: { $max: '$messageLength' },
                avg: { $avg: '$messageLength' }
            } }
        ])._batch[0];

    result.push({
        name: 'The longest message length',
        value: messageLength.max
    });
    result.push({
        name: 'Average message length',
        value: messageLength.avg.toFixed(2)
    });


    var mostTalkativeUser = db.getCollection(wordsCollection)
        .aggregate([
            { $group: {
                _id: '$userId',
                count: { $sum: 1 }
            } },
            { $sort: { count: 1 } }
        ])._batch[0];
    var mostTalkativeUserName = db.users.find({ _id: mostTalkativeUser._id })[0].name;

    result.push({
        name: 'Most talkative user',
        value: mostTalkativeUserName
    });
    result.push({
        name: 'Most talkative user messages count',
        value: mostTalkativeUser.count
    });


    db.getCollection(wordsCollection).remove({ });

    db.getCollection(statisticsCacheCollection).insert({
        created: new Date(),
        statistics: result
    });

    return result;
};
