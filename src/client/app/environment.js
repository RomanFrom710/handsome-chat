(function () {
    var env = {
        apiUrl: '', // todo: add api url
        // Templates will be cached and stored in 'compiled' folder,
        // but in angular they'll be available via this url.
        templatesUrl: '/src/client/app'
    };

    angular
        .module('handsome-chat')
        .constant('environment', env);
})();