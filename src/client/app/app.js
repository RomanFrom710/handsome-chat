(function () {
    angular
        .module('handsome-chat')
        .config(['RestangularProvider', '$locationProvider', '$httpProvider', 'environment',
            function (RestangularProvider, $locationProvider, $httpProvider, env) {
                RestangularProvider.setBaseUrl(env.apiUrl);
                $locationProvider.html5Mode(true);
                $httpProvider.interceptors.push('errorHandlingInterceptor');
            }]);

    angular.bootstrap(document, ['handsome-chat']);
})();