var cloudinary = require('cloudinary');
var config = require('../config');

// Cloudinary keys will be automatically read from env variable.
function cloudinaryUpload(image) {

}

function localUpload(image) {

}

if (config.useCloudinary) {
    exports.upload = cloudinaryUpload;
} else {
    exports.upload = localUpload;
}