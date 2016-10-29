'use strict';

var statisticsService = require('./statistics-service');
var router = require('express').Router();

module.exports = router;


router.route('/').get(function (req, res) {
    var statistics = statisticsService.getStatistics();
    res.send({ data: statistics });
});
