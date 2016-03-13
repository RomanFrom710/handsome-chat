var session = require('./session-init');

module.exports = initSocket;

function initSocket(server) {
    var io = require('socket.io')(server);

    io.use(function (socket, next) {
        session(socket.request, {}, next);
    });

    io.on('connection', function (socket) {
        console.log('connected');
        socket.on('disconnect', function () {
            console.log('disconnect');
        });
    });

    function getUser(req) {
        var passport = req.session.passport;
        if (passport && passport.user) {
            return passport.user;
        }
        return null;
    }
}