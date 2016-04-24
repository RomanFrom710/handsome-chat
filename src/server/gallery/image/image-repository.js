'use strict';

var User = require('../../user/user-model');
var ObjectId = require('mongoose').Types.ObjectId;

var _ = require('lodash');


exports.getImage = function (imageQuery) {
    return User
        .findOne({ '_id': imageQuery.userId, 'images._id': imageQuery.imageId })
        .select('images.$ name')
        .then(function (user) {
            var imageDto = user.images[0].toJSON();
            
            imageDto.author = {
                id: user.id,
                name: user.name
            };

            imageDto.likes = imageDto.likers.length; // todo: try to avoid loading all likers
            imageDto.likers = _.map(imageDto.likers, _.toString);
            imageDto.hasLiked = _.includes(imageDto.likers, imageQuery.currentUserId);
            delete imageDto.likers;
            
            return imageDto;
        });
};

exports.getImagePathes = function (userId, imageId) {
    return User
        .findOne({ '_id': userId, 'images._id': imageId })
        .select('images.$')
        .then(function (user) {
            return {
                url: user.images[0].url,
                previewUrl: user.images[0].previewUrl
            };
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
            { $addToSet: { 'images.$.likers': likeDto.currentUserId } },
            { new: true })
        //.findOne({ 'images._id': likeDto.imageId })
        //.select('images.$')
        .then(function () {
            return getLikesAmount(likeDto.userId, likeDto.imageId); // todo: merge two queries
        });
};

exports.unlikeImage = function (unlikeDto) {
    return User
        .findOneAndUpdate(
            { '_id': unlikeDto.userId, 'images._id': unlikeDto.imageId },
            { $pull: { 'images.$.likers': new ObjectId(unlikeDto.currentUserId) } },
            { new: true })
        //.findOne({ 'images._id': unlikeDto.imageId })
        //.select('images.$.likers')
        .then(function () {
            return getLikesAmount(unlikeDto.userId, unlikeDto.imageId); // todo: merge two queries
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


function getLikesAmount(userId, imageId) {
    return User
        .findOne({ '_id': userId, 'images._id': imageId })
        .select('images.$')
        .then(function (user) {
            return user.images[0].likers.length; // todo: it's not a good approach to load the whole document
        });
}