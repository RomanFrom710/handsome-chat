'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schemaTransformer = require('../../schema-transformer');

var imageSchema = new Schema({
    description: String,
    url: String,
    previewUrl: String,
    created: { type: Date, default: Date.now },
    likers: [{ type: Schema.Types.ObjectId, ref: 'User', unique: true }]
});

schemaTransformer.renameIdField(imageSchema);
module.exports = imageSchema;