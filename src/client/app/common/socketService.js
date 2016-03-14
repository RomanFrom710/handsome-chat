(function () {
    angular
        .module('common')
        .service('socketService', SocketService);

    SocketService.$inject = ['io', '$rootScope'];

    function SocketService(io, $rootScope) {
        var socket = io.connect();

        this.on = function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        };

        this.emit = function (eventName, data) {
            socket.emit(eventName, data);
        };
    }
})();