'use strict';

var User = require('../user/user-model');

exports.getUserImages = function (userId) {
    return User
        .findById(userId)
        .select('images');
};

exports.getImage = function (userId, imageId) {
    return User
        .findOne({
            'id': userId,
            'images.id': imageId
        });
};

exports.uploadImage = function(userId, imageDto) {
    return User.findByIdAndUpdate( userId, { $push: { images: imageDto } });
};