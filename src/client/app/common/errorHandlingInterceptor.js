(function () {
    angular
        .module('common')
        .factory('errorHandlingInterceptor', errorHandlingInterceptor);

    errorHandlingInterceptor.$inject = ['$q', 'toastr'];

    function errorHandlingInterceptor($q, toastr) {
        return {
            responseError: function (rejection) {
                toastr.error(rejection.message);
                return $q.reject(rejection);
            }
        };
    }
})();