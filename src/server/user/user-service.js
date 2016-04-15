'use strict';

var hashService = require('./password-hash-service');
var userRepository = require('./user-repository');

exports.findById = function (id) {
    return userRepository.findById(id);
};

exports.findByName = function (name) {
    return userRepository.findByName(name);
};

exports.createUser = function (userDto) {
    if (!userDto.name) {
        throw new Error('Name cannot be empty!');
    }

    userDto.passwordHash = hashService.getHash(userDto.password);

    return userRepository.findByName(userDto.name)
        .then(function (user) {
           if (user) {
               throw new Error('There is already the user with such name!');
           }
           return userRepository.createUser(userDto);
        });
};
