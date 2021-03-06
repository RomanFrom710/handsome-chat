'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var http = require('http');
var config = require('./config');
var authMiddleware = require('./extensions/auth');

mongoose.connect(config.mongoConnectionString);

// Express
var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var session = require('./inits/session-init');
app.use(session);

app.use(passport.initialize());
app.use(passport.session());
require('./inits/passport-init');


// Routes
var userRoutes = require('./user/user-routes');
app.use('/api/user/', userRoutes);

var chatRoutes = require('./chat/chat-routes');
app.use('/api/chat/', authMiddleware, chatRoutes);

var galleryRoutes = require('./gallery/gallery-routes');
app.use('/api/gallery/', authMiddleware, galleryRoutes);

var statisticsRoutes = require('./statistics/statistics-routers');
app.use('/api/statistics', authMiddleware, statisticsRoutes);


// Starting server
var server = http.createServer(app);
require('./inits/socket-init')(server);

var port = config.port;
server.listen(port);
