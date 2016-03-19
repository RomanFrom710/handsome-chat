(function () {
    angular
        .module('user')
        .service('userService', UserService);

    UserService.$inject = ['Restangular', '$localStorage'];

    function UserService(Restangular, $localStorage) {
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
                });
        };

        this.logout = function () {
            delete $localStorage.user;
            return Restangular.all('user/logout').post();
        };

        this.getCurrentUser = function () {
            return $localStorage.user || null;
        };

        this.resetCurrentUser = function () {
            delete $localStorage.user;
        }
    }
})();