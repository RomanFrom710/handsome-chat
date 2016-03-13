(function () {
    angular
        .module('handsome-chat')
        .config(['RestangularProvider', '$locationProvider', '$httpProvider', 'environment',
            function (RestangularProvider, $locationProvider, $httpProvider, env) {
                RestangularProvider.setBaseUrl(env.apiUrl);
                $locationProvider.html5Mode(true);
            }])
        .run(['Restangular', 'toastr',
            function (Restangular, toastr) {
                Restangular.setErrorInterceptor(function (response) {
                    if (response.status === 403) {
                        //todo: redirect to the login page
                    }
                    toastr.error(response.data);
                    return false;
                });
            }]);

    angular.bootstrap(document, ['handsome-chat']);
})();