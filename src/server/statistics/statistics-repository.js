'use strict';

var mongoose = require('mongoose');
var Promise = require('promise');


var mongoEval = Promise
    .denodeify(mongoose.connection.db.eval)
    .bind(mongoose.connection.db);

var example = function () {
    return [{
        name: 'test metric 1',
        value: 'test value 1'
    }, {
        name: 'test metric 2',
        value: 'test value 2'
    }];
};

mongoose.connection.on('connected', function () {
    mongoose.connection.db.collection('system.js', function (err, collection) {
        collection.save({ // Adding stored function
            _id: 'statistics',
            value: new mongoose.mongo.Code(example)
        });
    });
});

exports.getStatistics = function () {
    return mongoEval('statistics()');
};
