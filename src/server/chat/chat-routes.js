var router = require('express').Router();
var chatService = require('./chat-service');
var _ = require('lodash');

module.exports = router;

router.route('/lastMessages').get(function (req, res) {
    if (!req.isAuthenticated()) {
        // todo: implement middleware for this
        res.status(401).send();
    }

    chatService.getLastMessages()
        .then(function (messages) {
            res.send(messages);
        });
});

router.route('/onlineUsers').get(function (req, res) {
    if (!req.isAuthenticated()) {
        res.status(401).send();
    }

    var onlineUsers = chatService.getOnlineUsers();
    _.remove(onlineUsers, { id: req.user.id });
    res.send(onlineUsers);
});