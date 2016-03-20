var router = require('express').Router();
var chatService = require('./chat-service');
var _ = require('lodash');

module.exports = router;

router.route('/lastMessages').get(function (req, res) {
    chatService.getLastMessages()
        .then(function (messages) {
            res.send(messages);
        });
});

router.route('/onlineUsers').get(function (req, res) {
    var onlineUsers = chatService.getOnlineUsers();
    _.remove(onlineUsers, { id: req.user.id });
    res.send(onlineUsers);
});