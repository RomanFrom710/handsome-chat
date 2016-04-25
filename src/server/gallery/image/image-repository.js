'use strict';

var User = require('../../user/user-model');
var ObjectId = require('mongoose').Types.ObjectId;

var _ = require('lodash');
var Promise = require('promise');


exports.getImage = function (imageQuery) {
    return new Promise(function (resolve, reject) {
        User
            .aggregate()
            .match({ _id: new ObjectId(imageQuery.userId) })
            .project({ images: 1, name: 1 })
            .unwind('$images')
            .match({ 'images._id': new ObjectId(imageQuery.imageId) })
            .project({
                // We should exclude likers array, but only _id field excluding is supported,
                // so we include every field except the likers array.
                'previewUrl': '$images.previewUrl',
                'url': '$images.url',
                'id': '$images._id',
                'created': '$images.created',
                'description': '$images.description',
                'author.id': '$_id',
                'author.name': '$name',
                'hasLiked': { $setIsSubset: [[new ObjectId(imageQuery.currentUserId)], '$images.likers'] },
                'likes': { $size: { $ifNull: ['$images.likers', []] } }
            })
            .exec(function(err, result) {
                if (err) {
                    reject(err);
                    return;
                }

                result = result[0];
                delete result._id;
                resolve(result);
            });
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

// It seems like there's no possibility to update likes and get new amount in single query,
// because somewhy we can call aggregate only from the model object, not from the query.
// So here we user the second call to the db. I think it's still better to make two small
// calls instead of the huge one.
exports.likeImage = function (likeDto) {
    return User
        .findOneAndUpdate(
            { '_id': likeDto.userId, 'images._id': likeDto.imageId },
            { $addToSet: { 'images.$.likers': likeDto.currentUserId } })
        .select('id') // Select something for not loading the whole document
        .then(function () {
            return getLikesAmount(likeDto.userId, likeDto.imageId);
        });
};

exports.unlikeImage = function (unlikeDto) {
    return User
        .findOneAndUpdate(
            { '_id': unlikeDto.userId, 'images._id': unlikeDto.imageId },
            { $pull: { 'images.$.likers': new ObjectId(unlikeDto.currentUserId) } })
        .select('id') // Select something for not loading the whole document
        .then(function () {
            return getLikesAmount(unlikeDto.userId, unlikeDto.imageId);
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
    return new Promise(function (resolve, reject) {
        User
            .aggregate()
            .match({ _id: new ObjectId(userId) })
            .project({ images: 1, name: 1 })
            .unwind('$images')
            .match({ 'images._id': new ObjectId(imageId) })
            .project({ likes: { $size: { $ifNull: ['$images.likers', []] } } })
            .exec(function(err, result) {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(result[0].likes);
            });
    });
}