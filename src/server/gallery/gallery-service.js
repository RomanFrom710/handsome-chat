'use strict';

var imageRepository = require('./image/image-repository');
var imageStorageServie = require('./image-storage-service');
var config = require('../config');

var imageType = require('image-type');
var Promise = require('promise');
var _ = require('lodash');

exports.getUserImages = function (userId) {
    return imageRepository.getUserImages(userId);
};

exports.getImage = function (imageQuery) {
    return imageRepository.getImage(imageQuery);
};

exports.uploadImage = function (imageDto) {
    return new Promise(function (resolve) {
        validateImage(imageDto.imageFile);
        resolve(imageStorageServie.upload(imageDto.imageFile.buffer));
    })
    .then(function (imageData) {
        var newImageDto = {
            url: imageData.original,
            previewUrl: imageData.preview,
            userId: imageDto.userId
        };
        return imageRepository.saveImage(newImageDto);
    });
};

exports.likeImage = function (likeDto) {
    return imageRepository.likeImage(likeDto);
};

exports.unlikeImage = function (unlikeDto) {
    return imageRepository.unlikeImage(unlikeDto);
};

exports.updateImage = function (imageDto) {
    return imageRepository.updateImage(imageDto);
};

exports.deleteImage = function (userId, imageId) {
    var imageQuery = {
        userId: userId,
        imageId: imageId,
        currentUserId: userId
    };

    return imageRepository.getImage(imageQuery)
        .then(function (image) {
            var paths = {
                original: image.url,
                preview: image.previewUrl
            };
            return imageStorageServie.remove(paths);
        })
        .then(function () {
            return imageRepository.deleteImage(userId, imageId);
        });
};

exports.getFileRules = function () {
    return {
        allowedExtensions: config.application.images.allowedExtensions,
        maxSize: config.application.images.maxUploadSize
    };
};


function validateImage (imageFile) {
    var rules = exports.getFileRules();

    var isValidSize = imageFile.size < rules.maxSize;
    if (!isValidSize) {
        throw new Error('Wrong file size!');
    }

    var imageInfo = imageType(imageFile.buffer);
    var isValidExtension = imageInfo && _.includes(rules.allowedExtensions, imageInfo.ext);
    if (!isValidExtension) {
        throw new Error('Wrong file extension!');
    }
}