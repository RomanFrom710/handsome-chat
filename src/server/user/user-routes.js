var router = require('express').Router();
var passport = require('passport');
var userService = require('./user-service');
var config = require('../config');

module.exports = router;

router.route('/login').post(function (req, res, next) {
    passport.authenticate('local', function (err, user) {
        if (err) { return next(err); }
        if (user) {
            req.login(user, function (err) {
                if (err) { return next(err); }
                res.status(200).send();
            });
        } else {
            res.status(400).send('Wrong username or password!');
        }
    })(req, res, next);
});

router.route('/register').post(function (req, res) {
    userService.createUser(req.body.name, req.body.password)
        .then(function (user) {
            req.login(user, function () {
                res.send(true);
            });
        })
        .catch(function (err) {
            res.status(409).send(err.message);
        });
});

router.route('/logout').post(function (req, res) {
    req.logout();
    req.session.destroy();
    res.status(200).send();
});