'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
    id: Schema.Types.ObjectId,
    previewUrl: String
}, {
    _id: false
});

module.exports = imageSchema;
