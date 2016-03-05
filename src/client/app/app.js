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
                    toastr.error(response.data);
                });
            }]);

    angular.bootstrap(document, ['handsome-chat']);
})();