(function () {
    'use strict';

    var env = {
        apiUrl: '/api/',
        // Templates will be cached and stored in 'compiled' folder,
        // but in angular they'll be available via this url.
        templatesUrl: 'client/app/'
    };

    angular
        .module('common')
        .constant('environment', env);
})();