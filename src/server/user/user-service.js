var hashService = require('./password-hash-service');
var userRepository = require('./user-repository');

exports.findById = function (id) {
    return userRepository.findById(id);
};

exports.findByName = function (name) {
    return userRepository.findByName(name);
};

exports.createUser = function (name, password) {
    if (!name) {
        throw new Error('Name cannot be empty!');
    }

    var passwordHash = hashService.getHash(password);

    return userRepository.findByName(name)
        .then(function (user) {
           if (user) {
               throw new Error('There is already the user with such name!');
           }
           return userRepository.createUser(name, passwordHash);
        });
};
