(function () {
    'use strict';

    angular
        .module('user')
        .service('userService', UserService);

    UserService.$inject = ['Restangular', '$localStorage', 'socketService'];

    function UserService(Restangular, $localStorage, socketService) {
        var self = this;

        // todo: refactor current user methods
        this.getCurrentUser = function () {
            return $localStorage.userName || null;
        };
        
        this.getCurrentUserId = function () {
            return $localStorage.userId || null;
        };
        
        if (this.getCurrentUser()) {
            socketService.connect();
        }
        
        this.register = function (user) {
            return Restangular.all('user/register').post(user)
                .then(function (userId) {
                    $localStorage.userName = user.name;
                    $localStorage.userId = userId;
                    socketService.connect();
                });
        };

        this.login = function (user) {
            return Restangular.all('user/login').post(user)
                .then(function (userId) {
                    $localStorage.userName = user.name;
                    $localStorage.userId = userId;
                    socketService.connect();
                });
        };

        this.logout = function () {
            return Restangular.all('user/logout').post()
                .then(function () {
                    self.resetCurrentUser();
                });
        };

        this.resetCurrentUser = function () {
            if (self.getCurrentUser()) {
                delete $localStorage.userName;
                delete $localStorage.userId;
                socketService.disconnect();
            }
        };
    }
})();