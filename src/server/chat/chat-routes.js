var router = require('express').Router();
var chatService = require('./chat-service');

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
