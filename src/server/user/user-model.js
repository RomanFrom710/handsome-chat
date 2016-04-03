'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    passwordHash: String,
    created: { type: Date, default: Date.now },
    images: [{
        description: String,
        url: String,
        previewUrl: String,
        created: { type: Date, default: Date.now }
    }]
});

module.exports = mongoose.model('User', userSchema);