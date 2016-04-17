'use strict';

var PassThrough = require('stream').PassThrough;
var path = require('path');

var cloudinary = require('cloudinary');
var Promise = require('promise');

var previewBuilder = require('./preview-builder');

var deleteResourses = Promise.denodeify(cloudinary.api.delete_resources);

// Cloudinary keys will be automatically read from env variable.
exports.upload = function (imageBuffer) {
    var saveOriginalPromise = new Promise(function (resolve) {
        var originalImageStream = cloudinary.uploader.upload_stream(function (result) {
            resolve(result);
        });
        writeBufferToStream(imageBuffer, originalImageStream);
    });

    var savePreviewPromise = previewBuilder.writeToBuffer(imageBuffer)
        .then(function (previewBuffer) {
            return new Promise(function (resolve) { // Damn cloudinary with its callbacks...
                var previewImageStream = cloudinary.uploader.upload_stream(function (result) {
                    resolve(result);
                });
                writeBufferToStream(previewBuffer, previewImageStream);
            });
        });


    return Promise.all([saveOriginalPromise, savePreviewPromise])
        .then(function (uploadResults) {
            return {
                original: uploadResults[0].secure_url,
                preview: uploadResults[1].secure_url
            }
        });
};

exports.remove = function (paths) {
    var originalId = path.parse(paths.original).name;
    var previewId = path.parse(paths.preview).name;

    return deleteResourses([originalId, previewId]);
};


function writeBufferToStream(buffer, stream) {
    var bufferStream = new PassThrough();
    bufferStream.end(buffer);
    bufferStream.pipe(stream);
}
