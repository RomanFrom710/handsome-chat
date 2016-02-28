var User = require('./user-model');
var hashService= require('./password-hash-service');

exports.findByName = findByName;
exports.createUser = createUser;
exports.findById = findById;

function findById(id) {
    return User.findById(id);
}

function findByName(name) {
    return User.findOne({ name: name });
}

function createUser(name, password) {
    if (!name) {
        throw new Error('Name cannot be empty!');
    }

    var passwordHash = hashService.getHash(password);

    return findByName(name)
        .then(function (user) {
           if (user) {
               throw new Error('There is already the user with such name!');
           }
           return User.create({ name: name, passwordHash: passwordHash });
        });
}