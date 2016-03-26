var config = {
    mongoConnectionString: process.env.MONGODB,
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