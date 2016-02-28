(function () {
    angular
        .module('handsome-chat')
        .config(['RestangularProvider', 'environment',
            function (RestangularProvider, env) {
                RestangularProvider.setBaseUrl(env.apiUrl);
            }]);

    angular.bootstrap(document, ['handsome-chat']);
})();