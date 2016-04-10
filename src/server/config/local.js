'use strict';

var path = require('path');

var config = {
    mongoConnectionString: 'mongodb://127.0.0.1/handsomechat',
    port: 3000,
    session: {
        name: 'handsomeSession',
        secret: 'jsIsHandsome'
    },
    useCloudinary: false,
    imagesLocalPath: {
        public: '/userImages',
        absolute: path.resolve('./public/userImages')
    },
    application: {
        lastMessagesCount: 5,
        images: {
            maxUploadSize: 1024 * 1024, // 1 Mb
            allowedExtensions: ['jpg', 'jpeg', 'png'],
            previewSize: 150, // Width and height
            previewQuality: 60
        }
    }
};

module.exports = config;