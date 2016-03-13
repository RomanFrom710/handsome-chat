(function () {
    angular
        .module('common')
        .service('socketService', SocketService);

    SocketService.$inject = ['io', '$rootScope'];

    function SocketService(io, $rootScope) {
        var socket;

        this.connect = function () {
            if (!socket) {
                socket = io.connect();
            }
        };

        this.on = function (eventName, callback) {
            checkSocket();
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.apply(function () {
                    callback.apply(socket, args);
                });
            });
        };

        this.emit = function (eventName, callback) {
            checkSocket();
            socket.emit(eventName, function () {
                var args = arguments;
                $rootScope.apply(function () {
                    callback.apply(socket, args);
                });
            });
        };

        function checkSocket() {
            if (!socket) {
                throw new Error('You must connect socket first!');
            }
        }
    }
})();