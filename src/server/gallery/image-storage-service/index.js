'use strict';

var config = require('../../config');

if (config.useCloudinary) {
    module.exports = require('./cloudinary-storage');
} else {
    module.exports = require('./local-storage');
}
