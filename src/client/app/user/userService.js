(function () {
    'use strict';

    angular
        .module('user')
        .service('userService', UserService);

    UserService.$inject = ['Restangular', '$localStorage', 'socketService'];

    function UserService(Restangular, $localStorage, socketService) {
        var self = this;

        this.getCurrentUser = function () {
            return {
                id: $localStorage.userId || null,
                name: $localStorage.userName || null
            };
        };
        
        this.isLoggedIn = function () {
            var currentUser = this.getCurrentUser();
            return !!(currentUser.id && currentUser.name);
        };
        
        if (this.isLoggedIn()) {
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
            if (this.isLoggedIn()) {
                delete $localStorage.userName;
                delete $localStorage.userId;
                socketService.disconnect();
            }
        };
    }
})();