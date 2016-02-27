var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var userRepository = require('../users/user-repository');
var hashService = require('../users/password-hash-service');

passport.use(new Strategy(function(username, password, cb) {
    var passwordHash = hashService.getHash(password);
    userRepository.findByName(username)
        .then(function (user) {
            if (!user || user.passwordHash !== passwordHash) {
                cb(null, false);
            }
            cb(null, user);
        })
        .catch(function (error) { cb(error); });
}));
