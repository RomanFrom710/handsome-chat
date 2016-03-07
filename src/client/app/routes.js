(function () {
    angular
        .module('handsome-chat')
        .config(['$stateProvider', '$urlRouterProvider', 'environment',
            function ($stateProvider, $urlRouterProvider, env) {
                $stateProvider
                    .state('login', {
                        url: '/login',
                        templateUrl: env.templatesUrl + 'user/login/login.html',
                        controller: 'loginController',
                        controllerAs: 'vm'
                    })
                    .state('register', {
                        url: '/register',
                        templateUrl: env.templatesUrl + 'user/register/register.html',
                        controller: 'registerController',
                        controllerAs: 'vm'
                    })
                    .state('chat', {
                        url: '/chat',
                        templateUrl: env.templatesUrl + 'chat/chat.html',
                        controller: 'chatController',
                        controllerAs: 'vm'
                    });

                $urlRouterProvider.when('/', '/chat');
                $urlRouterProvider.otherwise('/');
            }]);
})();