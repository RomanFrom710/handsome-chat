'use strict';

var env = process.env.NODE_ENV;

var config;
if (env === 'production') {
    config = require('./configs/prod');
} else {
    config = require('./configs/local');
}

module.exports = config;
