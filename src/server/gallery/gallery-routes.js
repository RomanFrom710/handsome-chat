'use strict';

var galleryService = require('./gallery-service');
var router = require('express').Router();

module.exports = router;

router.route('/upload').post(function (req, res) {
    res.send(); // mock
});

router.route('/filerules').get(function (req, res) {
    var rules = galleryService.getFileRules();
    res.send(rules);
});