var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var userService = require('../user/user-service');
var hashService = require('../user/password-hash-service');

var strategyOptions = {
    usernameField: 'name',
    passwordField: 'password'
};

function strategyFunction(username, password, cb) {
    var passwordHash = hashService.getHash(password);
    userService.findByName(username)
        .then(function (user) {
            if (!user || user.passwordHash !== passwordHash) {
                cb(null, false);
            } else {
                cb(null, user);
            }
        })
        .catch(function (err) { cb(err); });
}

passport.use(new Strategy(strategyOptions, strategyFunction));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    userService.findById(id)
        .then(function (user) {
            done(null, user);
        });
});