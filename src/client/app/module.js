(function () {
    var dependencies = [
        'common',
        'chat',
        'gallery',
        'user',
        'templates',
        'ui.router',
        'ui.bootstrap',
        'restangular',
        'ngStorage',
        'ngAnimate',
        'angularFileUpload',
        'toastr'
    ];
    angular
        .module('handsome-chat', dependencies);
})();