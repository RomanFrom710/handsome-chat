'use strict';

var jimp = require('jimp');
var Promise = require('promise');
var imageType = require('image-type');

var config = require('../../config');


exports.writeToFile = function (imageBuffer, path) {
    return getPreview(imageBuffer)
        .then(function (previewImage) {
            previewImage.write = Promise.denodeify(previewImage.write);
            return previewImage.write(path);
        });
};

exports.writeToBuffer = function (imageBuffer) {
    return getPreview(imageBuffer)
        .then(function (previewImage) {
            var mime = imageType(imageBuffer).mime;
            previewImage.getBuffer = Promise.denodeify(previewImage.getBuffer);
            return previewImage.getBuffer(mime);
        });
};


function getPreview (imageBuffer) {
    return jimp.read(imageBuffer)
        .then(function (image) {
            var size = config.application.images.previewSize;
            var quality = config.application.images.previewQuality;

            image
                .cover(size, size)
                .quality(quality);
            return Promise.resolve(image);
        });
}
