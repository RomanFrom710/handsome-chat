var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var path = require('path');
var config = require('./config');

mongoose.connect(config.mongoConnectionString);

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
require('./configs/passport-config');

var userRoutes = require('./user/user-routes');
app.use('/api/user/', userRoutes);

app.all('/*', function (req, res) {
    var indexPath = path.join(__dirname, '..', '..' ,'public', 'index.html');
    res.sendFile(indexPath);
});

server.listen(3000);
