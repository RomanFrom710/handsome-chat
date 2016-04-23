'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schemaTransformer = require('../schema-transformer');

var imageSchema = require('../gallery/image/image-schema');

var userSchema = new Schema({
    name: String,
    passwordHash: String,
    created: { type: Date, default: Date.now },
    images: [imageSchema]
}, {
    useNestedStrict: true
});

schemaTransformer.renameIdField(userSchema);
module.exports = mongoose.model('User', userSchema);