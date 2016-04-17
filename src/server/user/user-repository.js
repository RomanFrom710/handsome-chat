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

exports.getUserProfile = function (userId) {
    return User
        .findById(userId)
        .select('id name created images.id images.previewUrl');
};

exports.createUser = function (userDto) {
    return User.create({ name: userDto.name, passwordHash: userDto.passwordHash });
};
