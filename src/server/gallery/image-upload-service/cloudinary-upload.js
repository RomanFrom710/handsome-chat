'use strict';

var PassThrough = require('stream').PassThrough;

var cloudinary = require('cloudinary');
var Promise = require('promise');

var previewBuilder = require('./preview-builder');


// Cloudinary keys will be automatically read from env variable.
module.exports = function (imageBuffer) {
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


function writeBufferToStream(buffer, stream) {
    var bufferStream = new PassThrough();
    bufferStream.end(buffer);
    bufferStream.pipe(stream);
}
