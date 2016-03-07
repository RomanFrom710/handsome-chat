(function () {
    angular
        .module('common')
        .factory('socket', function () {
            return io;
        });
})();