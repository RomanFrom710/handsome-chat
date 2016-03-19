(function () {
    angular
        .module('handsome-chat')
        .config(['RestangularProvider', 'environment',
            function (RestangularProvider, env) {
                RestangularProvider.setBaseUrl(env.apiUrl);
            }])
        .run(['Restangular', 'toastr', '$state', 'userService',
            function (Restangular, toastr, $state, userService) {
                Restangular.setErrorInterceptor(function (response) {
                    if (response.status === 401) {
                        userService.resetCurrentUser();
                        $state.go('login');
                    } else {
                        toastr.error(response.data);
                    }
                    return false;
                });
            }]);

    angular.bootstrap(document, ['handsome-chat']);
})();