var User = require('./user-model');

exports.findByName = findByName;

function findByName(name) {
    return User.findOne({ name: name });
}