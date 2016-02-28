var express = require('express');
var mongoose = require('mongoose');
var config = require('./config');
var bodyParser = require('body-parser');

var userRoutes = require('./user/user-routes');

require('./configs/passport-settings');

var app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/user/', userRoutes);

mongoose.connect(config.mongoConnectionString);


app.listen(3000);
