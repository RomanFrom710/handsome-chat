var hashService= require('./password-hash-service');
var userRepository = require('./user-repository');

exports.findByName = findByName;
exports.createUser = createUser;
exports.findById = findById;

function findById(id) {
    return userRepository.findById(id);
}

function findByName(name) {
    return userRepository.findByName(name);
}

function createUser(name, password) {
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
}