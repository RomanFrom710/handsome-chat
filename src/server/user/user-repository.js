var User = require('./user-model');

exports.findById = function (id) {
    return User.findById(id);
};

exports.findByName = function (name) {
    return User.findOne({ name: name });
};

exports.createUser = function (name, passwordHash) {
    return User.create({ name: name, passwordHash: passwordHash });
};
