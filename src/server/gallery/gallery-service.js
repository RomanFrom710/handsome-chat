'use strict';

var galleryRepository = require('./gallery-repository');
var imageUploadServie = require('./image-upload-service');
var config = require('../config');

var imageType = require('image-type');
var Promise = require('promise');

exports.getUserImages = function (userId) {
    return galleryRepository.getUserImages(userId);
};

exports.getImage = function (userId, imageId) {
    return galleryRepository.getImage(userId, imageId);
};

exports.uploadImage = function (userId, imageFile) {
    return new Promise(function (resolve) {
        exports.validateImage(imageFile);
        resolve(imageUploadServie.upload(imageFile.buffer));
    });
};

exports.getFileRules = function () {
    return {
        allowedExtensions: config.application.images.allowedExtensions,
        maxSize: config.application.images.maxUploadSize
    };
};

exports.validateImage = function (imageFile) {
    var rules = exports.getFileRules();

    var isValidSize = imageFile.size < rules.maxSize;
    if (!isValidSize) {
        throw new Error('Wrong file size!');
    }

    var imageInfo = imageType(imageFile.buffer);
    var isValidExtension = imageInfo && rules.allowedExtensions.indexOf(imageInfo.ext) !== -1;
    if (!isValidExtension) {
        throw new Error('Wrong file extension!');
    }
};