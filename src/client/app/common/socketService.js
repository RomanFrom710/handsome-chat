(function () {
    angular
        .module('common')
        .service('socketService', SocketService);

    SocketService.$inject = ['io', '$rootScope'];

    function SocketService(io, $rootScope) {
        var socket = null;

        this.connect = function () {
            if (!socket) {
                socket = io.connect();
            }
        };

        this.disconnect = function () {
            checkSocket();
            socket.disconnect();
            socket = null;
        };

        this.on = function (eventName, callback) {
            checkSocket();
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        };

        this.emit = function (eventName, data) {
            checkSocket();
            socket.emit(eventName, data);
        };

        function checkSocket() {
            if (!socket) {
                throw new Error('Socket must be connected first!');
            }
        }
    }
})();