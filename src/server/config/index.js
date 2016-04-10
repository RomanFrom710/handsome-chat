'use strict';

var env = process.env.NODE_ENV;

var config;
if (env === 'production') {
    config = require('./prod');
} else {
    config = require('./local');
}

module.exports = config;
