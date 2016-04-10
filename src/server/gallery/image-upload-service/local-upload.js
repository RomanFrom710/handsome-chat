'use strict';

var fs = require('fs');
var path = require('path');

var Promise = require('promise');
var uuid = require('node-uuid');
var imageType = require('image-type');
var jimp = require('jimp');

var previewBuilder = require('./preview-builder');
var config = require('../../config');


var imageFolder = config.imagesLocalPath.absolute;
fs.mkdir(imageFolder, function () {});  // Create folder, if doesn't exist

module.exports = function (imageBuffer) {
    var names = getImageNames(imageBuffer);
    var absolutePaths = getAbsolutePaths(names);
    var publicPaths = getPublicPaths(names);

    var saveOriginalPromise = fs.writeFile(absolutePaths.original, imageBuffer);
    var savePreviewPromise = previewBuilder.writeToFile(imageBuffer, absolutePaths.preview);

    return Promise.all([saveOriginalPromise, savePreviewPromise])
        .then(function () {
            return publicPaths;
        });
};


function getImageNames(imageBuffer) {
    var imageName = uuid.v4(); // Without extension

    var extension = imageType(imageBuffer).ext;
    var originalImageName = imageName + '.' + extension;
    // Preview suffix isn't configurable, because we'll not need it in
    // the future (both original and preview paths will be stored in db).
    var previewImageName = imageName + '-preview.' + extension;

    return {
        original: originalImageName,
        preview: previewImageName
    };
}

function getAbsolutePaths(imageNames) {
    return {
        original: path.join(config.imagesLocalPath.absolute, imageNames.original),
        preview: path.join(config.imagesLocalPath.absolute, imageNames.preview)
    };
}

function getPublicPaths(imageNames) {
    return {
        original: path.posix.join(config.imagesLocalPath.public, imageNames.original),
        preview: path.posix.join(config.imagesLocalPath.public, imageNames.preview)
    };
}
