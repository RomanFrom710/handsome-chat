'use strict';

var galleryService = require('./gallery-service');
var router = require('express').Router();
var multer = require('multer');

module.exports = router;

var multerMiddleware = multer({ storage: multer.memoryStorage() }).single('file');
router.route('/upload').post(multerMiddleware, function (req, res) {
    var imageDto = {
        userId: req.user.id,
        imageFile: req.file
    };

    galleryService.uploadImage(imageDto)
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

router.route('/:userId/:imageId').get(function (req, res) {
    var imageQuery = {
        imageId: req.params.imageId,
        userId: req.params.userId,
        currentUserId: req.user.id
    };
    
    galleryService.getImage(imageQuery)
        .then(function (userImage) {
            res.send(userImage);
        })
        .catch(function () {
            res.status(404).send('Image not found!');
        });
});

router.route('/:userId/:imageId/like').post(function (req, res) {
    var likeDto = {
        userId: req.params.userId,
        imageId: req.params.imageId,
        currentUserId: req.user.id
    };

    galleryService.likeImage(likeDto)
        .then(function (likes) {
            res.send(likes.toString());
        })
        .catch(function () {
            res.status(400).send('Error while liking the image!');
        });
});

router.route('/:userId/:imageId/unlike').post(function (req, res) {
    var unlikeDto = {
        userId: req.params.userId,
        imageId: req.params.imageId,
        currentUserId: req.user.id
    };

    galleryService.unlikeImage(unlikeDto)
        .then(function (likes) {
            res.send(likes.toString());
        })
        .catch(function () {
            res.status(400).send('Error while unliking the image!');
        });
});

router.route('/:imageId').put(function (req, res) {
    var imageDto = {
        id: req.params.imageId,
        userId: req.user.id,
        description: req.body.description
    };
    
    galleryService.updateImage(imageDto)
        .then(function () {
            res.send(true);
        })
        .catch(function () {
            res.status(500).send('Error while updating image!');
        });
});

router.route('/:imageId').delete(function (req, res) {
    var imageId = req.params.imageId;
    var userId = req.user.id;
    
    galleryService.deleteImage(userId, imageId)
        .then(function () {
            res.send(true);
        })
        .catch(function () {
            res.status(500).send('Error while deleting image!');
        });
});
