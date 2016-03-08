var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomSchema = new Schema({
    name: String,
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Room', roomSchema);