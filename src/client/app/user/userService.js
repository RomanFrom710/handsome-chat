(function () {
    angular
        .module('user')
        .service('userService', UserService);

    UserService.$inject = ['Restangular', '$localStorage', 'socketService'];

    function UserService(Restangular, $localStorage, socketService) {
        var self = this;

        if (getCurrentUser()) {
            socketService.connect();
        }
        
        this.register = function (user) {
            return Restangular.all('user/register').post(user)
                .then(function () {
                    $localStorage.user = user.name;
                });
        };

        this.login = function (user) {
            return Restangular.all('user/login').post(user)
                .then(function () {
                    $localStorage.user = user.name;
                    socketService.connect();
                });
        };

        this.logout = function () {
            return Restangular.all('user/logout').post()
                .then(function () {
                    self.resetCurrentUser();
                });
        };

        this.getCurrentUser = getCurrentUser;

        this.resetCurrentUser = function () {
            if ($localStorage.user) {
                delete $localStorage.user;
                socketService.disconnect();
            }
        }

        function getCurrentUser () {
            return $localStorage.user || null;
        }
    }
})();