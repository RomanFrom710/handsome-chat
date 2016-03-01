(function () {
    angular
        .module('handsome-chat')
        .config(['RestangularProvider', '$locationProvider', 'environment',
            function (RestangularProvider, $locationProvider, env) {
                RestangularProvider.setBaseUrl(env.apiUrl);
                $locationProvider.html5Mode(true);
            }]);

    angular.bootstrap(document, ['handsome-chat']);
})();