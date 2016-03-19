var config = {
    mongoConnectionString: 'mongodb://127.0.0.1/handsomechat',
    port: 3000,
    session: {
        name: 'handsomeSession',
        secret: 'jsIsHandsome'
    },
    application: {
        lastMessagesCount: 5
    }
};

module.exports = config;