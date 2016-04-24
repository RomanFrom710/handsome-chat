'use strict';

var User = require('../../user/user-model');
var ObjectId = require('mongoose').Types.ObjectId;


exports.getImage = function (userId, imageId) {
    return User
        .findOne(
            { '_id': userId, 'images._id': imageId })
        .select('images.$ name')
        .then(function (user) {
            var imageDto = user.images[0].toJSON();
            imageDto.author = {
                id: user.id,
                name: user.name
            };
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
        .select({ images: { $slice: -1 } }) // Get only the last image
        .then(function (user) {
            return user.images[0].id;
        });
};

exports.likeImage = function (likeDto) {
    return User
        .findOneAndUpdate(
            { '_id': likeDto.userId, 'images._id': likeDto.imageId },
            { $push: { 'images.$.likers': likeDto.currentUserId } },
            { new: true })
        .findOne({ 'images._id': likeDto.imageId })
        .select('images.$')
        .then(function (user) {
            return user.images[0].likers.length; // todo: don't load the whole likers array
        });
};

exports.unlikeImage = function (unlikeDto) {
    return User
        .findOneAndUpdate(
            { '_id': unlikeDto.userId, 'images._id': unlikeDto.imageId },
            { $pull: { 'images.$.likers': new ObjectId(unlikeDto.currentUserId) } },
            { new: true })
        .findOne({ 'images._id': unlikeDto.imageId })
        .select('images.$')
        .then(function (user) {
            return user.images[0].likers.length; // todo: don't load the whole likers array
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
