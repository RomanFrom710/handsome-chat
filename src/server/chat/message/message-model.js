'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var imageSchema = require('./message-image-schema');

var messageSchema = new Schema({
    content: String,
    created: { type: Date, default: Date },
    image: imageSchema,
    author: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    useNestedStrict: true
});

module.exports = mongoose.model('Message', messageSchema);