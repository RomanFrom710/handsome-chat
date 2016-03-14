(function () {
    angular
        .module('handsome-chat')
        .config(['RestangularProvider', 'environment',
            function (RestangularProvider, env) {
                RestangularProvider.setBaseUrl(env.apiUrl);
            }])
        .run(['Restangular', 'toastr', '$state',
            function (Restangular, toastr, $state) {
                Restangular.setErrorInterceptor(function (response) {
                    if (response.status === 403) {
                        $state.go('login');
                    }
                    toastr.error(response.data);
                    return false;
                });
            }]);

    angular.bootstrap(document, ['handsome-chat']);
})();