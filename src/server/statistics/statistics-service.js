'use strict';

var statisticsRepository = require('./statistics-repository');


exports.getStatistics = function () {
    return statisticsRepository.getStatistics();
};
