var galleryRepository = require('./gallery-repository');

exports.getUserImages = function (userId) {
    return galleryRepository.getUserImages(userId);
};

exports.getImage = function (userId, imageId) {
    return galleryRepository.getImage(userId, imageId);
};

exports.uploadImage = function(userId, imageDto) {
    
};