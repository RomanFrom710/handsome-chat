(function () {
    angular
        .module('user')
        .service('userService', UserService);

    UserService.$inject = ['Restangular', '$sessionStorage'];

    function UserService(Restangular, $sessionStorage) {
        this.register = function (user) {
            return Restangular.all('user').post(user);
        };

        this.login = function (user) {
            return Restangular.all('user/login').post(user)
                .then(function () {
                    $sessionStorage.user = user.name;
                });
        };

        this.getCurrentUser = function () {
            return $sessionStorage.user || null;
        };
    }
})();