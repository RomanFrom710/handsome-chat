var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var userService = require('../user/user-service');
var hashService = require('../user/password-hash-service');

passport.use(new Strategy(function(username, password, cb) {
    var passwordHash = hashService.getHash(password);
    userService.findByName(username)
        .then(function (user) {
            if (!user || user.passwordHash !== passwordHash) {
                cb(null, false);
            }
            cb(null, user);
        })
        .catch(function (err) { cb(err); });
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    userService.findById(id)
        .then(function (user) {
            done(null, user);
        });
});