var User = require('./user-model');

exports.findByName = findByName;
exports.createUser = createUser;
exports.findById = findById;

function findById(id) {
    return User.findById(id);
}

function findByName(name) {
    return User.findOne({ name: name });
}

function createUser(name, passwordHash) {
    return User.create({ name: name, passwordHash: passwordHash });
}