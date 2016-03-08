var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
    content: String,
    created: { type: Date, default: Date },
    room: { type: Schema.Types.ObjectId, ref: 'Room' },
    author: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Message', messageSchema);