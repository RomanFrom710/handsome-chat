'use strict';

var User = require('./user-model');

exports.findById = function (id) {
    return User
        .findById(id)
        .select('-images');
};

exports.findByName = function (name) {
    return User
        .findOne({ name: name })
        .select('-images');
};

exports.createUser = function (name, passwordHash) {
    return User.create({ name: name, passwordHash: passwordHash });
};
