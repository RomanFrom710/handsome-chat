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
            '_id': userId,
            'images._id': imageId
        })
        .select({ images: { $slice: -1 } }) // Get only the last image
        .then(function (user) {
            var imageDto = user.images[0].toObject();
            imageDto.author = {
                id: user.id,
                name: user.name
            };
            return imageDto;
        });
};

exports.saveImage = function(userId, imageDto) {
    return User
        .findByIdAndUpdate(
            userId,
            { $push: { images: imageDto } })
        .select('images')
        .select({ images: { $slice: -1 } }) // Get only the last image
        .then(function (user) {
            return user.images[0].id;
        });
};