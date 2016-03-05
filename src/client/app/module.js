(function () {
    var dependencies = [
        'common',
        'chat',
        'gallery',
        'user',
        'templates',
        'ui.router',
        'restangular',
        'ngStorage',
        'ngAnimate',
        'toastr'
    ];
    angular
        .module('handsome-chat', dependencies);
})();