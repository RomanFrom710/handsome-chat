var expressSession = require('express-session');
var mongoose = require('mongoose');
var Store = require('connect-mongo')(expressSession);
var config = require('../config');

var session = expressSession({
    name: config.session.name,
    secret: config.session.secret,
    store: new Store({ mongooseConnection: mongoose.connection }),
    resave: true,
    saveUninitialized: true
});

module.exports = session;