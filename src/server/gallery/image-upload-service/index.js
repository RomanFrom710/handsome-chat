'use strict';

var config = require('../../config');

if (config.useCloudinary) {
    exports.upload = require('./cloudinary-upload');
} else {
    exports.upload = require('./local-upload');
}
