'use strict';

var config = {
    mongoConnectionString: 'mongodb://127.0.0.1/handsomechat',
    port: 3000,
    session: {
        name: 'handsomeSession',
        secret: 'jsIsHandsome'
    },
    useCloudinary: false,
    application: {
        lastMessagesCount: 5,
        images: {
            maxUploadSize: 2 * 1024 * 1024, // 2 Mb
            allowedExtensions: ['jpg', 'jpeg', 'png'],
            previewHeight: 150,
            previewQuality: 70
        }
    }
};

module.exports = config;