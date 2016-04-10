'use strict';

var galleryService = require('./gallery-service');
var router = require('express').Router();
var multer = require('multer');

module.exports = router;

var multerMiddleware = multer({ storage: multer.memoryStorage() }).single('file');
router.route('/upload').post(multerMiddleware, function (req, res) {
    var file = req.file;
    var userId = req.user.id;
    
    galleryService.uploadImage(userId, file)
        .then(function (imagePaths) {
            res.send(imagePaths);
        })
        .catch(function (error) {
            res.status(400).send(error.message);
        });
});

router.route('/filerules').get(function (req, res) {
    var rules = galleryService.getFileRules();
    res.send(rules);
});