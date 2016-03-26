var config = {
    mongoConnectionString: process.env.MONGODB || 'mongodb://127.0.0.1/handsomechat',
    port: process.env.PORT || 80,
    session: {
        name: 'handsomeSession',
        secret: 'jsIsHandsome'
    },
    application: {
        lastMessagesCount: 5
    }
};

module.exports = config;