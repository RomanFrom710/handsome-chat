var localConfig = require('./local');
// Some values are the same in local and prod config.

var config = {
    mongoConnectionString: process.env.MONGODB || localConfig.mongoConnectionString,
    port: process.env.PORT || 80,
    session: localConfig.session,
    useCloudinary: true,
    application: localConfig.application
};

module.exports = config;