var express = require('express');
var mongoose = require('mongoose');
var config = require('./config');

require('./configs/passport-settings');

var app = express();
app.use(express.static('public'));

mongoose.connect(config.mongoConnectionString);


app.listen(3000);
