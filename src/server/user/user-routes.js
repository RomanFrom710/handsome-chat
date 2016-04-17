'use strict';

var router = require('express').Router();
var passport = require('passport');
var userService = require('./user-service');
var authMiddleware = require('../auth');

module.exports = router;

router.route('/login').post(function (req, res, next) {
    passport.authenticate('local', function (err, user) {
        if (err) { return next(err); }
        if (user) {
            req.login(user, function (err) {
                if (err) { return next(err); }
                res.status(200).send(user.id);
            });
        } else {
            res.status(400).send('Wrong username or password!');
        }
    })(req, res, next);
});

router.route('/register').post(function (req, res) {
    var userDto = {
        name: req.body.name,
        password: req.body.password
    };
    userService.createUser(userDto)
        .then(function (user) {
            req.login(user, function () {
                res.send(user.id);
            });
        })
        .catch(function (err) {
            res.status(409).send(err.message);
        });
});

router.route('/logout').post(function (req, res) {
    req.logout();
    req.session.destroy(function () {});
    res.status(200).send();
});

router.route('/:userId').get(authMiddleware, function (req, res) {
    var userId = req.params.userId;
    userService.getUserProfile(userId)
        .then(function (profile) {
            res.send(profile);
        })
        .catch(function () {
            res.status(404).send('User not found!');
        });
});
