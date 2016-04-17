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
            imageDto.id = imageDto._id;
            delete imageDto._id;
            return imageDto;
        });
};

exports.saveImage = function (imageDto) {
    var userId = imageDto.userId;
    delete imageDto.userId;
    return User
        .findByIdAndUpdate(
            userId,
            { $push: { images: imageDto } },
            { new: true })
        .select('images')
        .select({ images: { $slice: -1 } }) // Get only the last image
        .then(function (user) {
            return user.images[0].id;
        });
};

exports.updateImage = function (imageDto) {
    return User
        .findOneAndUpdate(
            { '_id': imageDto.userId, 'images._id': imageDto.id },
            { $set: { 'images.$.description': imageDto.description }}
        );
};

exports.deleteImage = function (userId, imageId) {
    return User
        .findByIdAndUpdate(
            userId,
            { $pull: { images: { id: imageId } } });
};
