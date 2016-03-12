var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var path = require('path');
var http = require('http');
var config = require('./config');

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

// Navigation hack
app.all('/*', function (req, res) {
    var indexPath = path.join(__dirname, '..', '..' ,'public', 'index.html');
    res.sendFile(indexPath);
});

var server = http.createServer(app);
require('./inits/socket-init')(server);

var port = process.env.PORT || config.port;
server.listen(port);
