(function () {
    'use strict';

    var dependencies = [
        'common',
        'chat',
        'gallery',
        'user',
        'statistics',
        'templates',
        'ui.router',
        'ui.bootstrap',
        'restangular',
        'ngStorage',
        'ngAnimate',
        'angularFileUpload',
        'mwl.confirm',
        'toastr'
    ];
    angular
        .module('handsome-chat', dependencies);
})();