var galleryRepository = require('./gallery-repository');
var config = require('../config');

exports.getUserImages = function (userId) {
    return galleryRepository.getUserImages(userId);
};

exports.getImage = function (userId, imageId) {
    return galleryRepository.getImage(userId, imageId);
};

exports.uploadImage = function(userId, imageDto) {
    
};

exports.getFileRules = function () {
    return {
        allowedExtensions: config.application.images.allowedExtensions,
        maxSize: config.application.images.maxUploadSize
    };
};