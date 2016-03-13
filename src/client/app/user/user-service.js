(function () {
    angular
        .module('user')
        .service('userService', UserService);

    UserService.$inject = ['Restangular', '$localStorage', 'environment'];

    function UserService(Restangular, $localStorage, env) {
        this.register = function (user) {
            return Restangular.all('user/register').post(user);
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

        // todo: handle case when session is expired
        this.getCurrentUser = function () {
            return $localStorage.user || null;
        };
    }
})();