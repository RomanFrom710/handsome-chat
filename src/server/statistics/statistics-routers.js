'use strict';

var statisticsService = require('./statistics-service');
var router = require('express').Router();

module.exports = router;


router.route('/').get(function (req, res) {
    statisticsService
        .getStatistics()
        .then(function (result) {
            res.send({ data: result });
        })
        .catch(function (err) { console.log(err); });
});
