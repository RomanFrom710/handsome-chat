'use strict';

var mongoose = require('mongoose');
var Promise = require('promise');

var getStatistics = require('./statistics-stored-function');
var storedFunctionName = 'statistics';


var mongoEval = Promise
    .denodeify(mongoose.connection.db.eval)
    .bind(mongoose.connection.db);

mongoose.connection.on('connected', function () {
    mongoose.connection.db.collection('system.js', function (err, collection) {
        collection.save({ // Adding stored function
            _id: storedFunctionName,
            value: new mongoose.mongo.Code(getStatistics)
        });
    });
});

exports.getStatistics = function () {
    return mongoEval(storedFunctionName + '()');
};
