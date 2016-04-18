'use strict';

var User = require('../user/user-model');


exports.getImage = function (userId, imageId) {
    return User
        .findOne(
            { '_id': userId, 'images._id': imageId },
            { 'images.$': 1 }) // todo: why is it working?
        .then(function (user) {
            var imageDto = user.images[0].toObject();
            imageDto.author = {
                id: user.id,
                name: user.name
            };
            imageDto.id = imageDto._id;
            delete imageDto._id; // todo: it's not a jedi way of converting _id to id (find some global option)
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
            { $pull: { images: { _id: imageId } } });
};
