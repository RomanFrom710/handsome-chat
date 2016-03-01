var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var config = require('./config');

mongoose.connect(config.mongoConnectionString);

var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
require('./configs/passport-config');

var userRoutes = require('./user/user-routes');
app.use('/api/user/', userRoutes);

app.listen(3000);
