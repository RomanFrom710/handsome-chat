var router = require('express').Router();
var passport = require('passport');
var userService = require('./user-service');

module.exports = router;

router.route('login').post(
    passport.authenticate('local', {
        successRedirect: '/chat',
        failureRedirect: '/login'
    })
);

router.route('').post(function (req, res) {
    userService.createUser(req.body.name, req.body.password)
        .then(function () {
            res.send(true);
        })
        .catch(function (err) {
            res.send(err);
        });
});

router.route('logout').post(function (req, res) {
    req.logout();
    res.redirect('/');
});