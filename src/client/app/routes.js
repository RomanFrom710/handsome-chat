(function () {
    'use strict';

    angular
        .module('handsome-chat')
        .config(['$stateProvider', '$urlRouterProvider', 'modalStateProvider', 'environment',
            function ($stateProvider, $urlRouterProvider, modalStateProvider, env) {
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
                        url: '/',
                        templateUrl: env.templatesUrl + 'chat/chat.html',
                        controller: 'chatController',
                        controllerAs: 'vm',
                        resolve: {
                            lastMessages: ['chatService', function (chatService) {
                                return chatService.getLastMessages();
                            }],
                            onlineUsers: ['chatService', function (chatService) {
                                return chatService.getOnlineUsers();
                            }]
                        }
                    });

                modalStateProvider
                    .state('chat.singleImage', {
                        url: 'image/:id',
                        templateUrl: env.templatesUrl + 'gallery/image/viewEdit/viewEditImage.html',
                        controller: 'viewEditImageController',
                        controllerAs: 'vm',
                        size: 'full',
                        resolve: {
                            image: ['galleryService', '$stateParams',
                                function (galleryService, $stateParams) {
                                    return galleryService.getImage($stateParams.id);
                                }]
                        }
                    })
                    .state('chat.profile', {
                        url: 'user/:id?',
                        template:'a'
                    });
                
                $urlRouterProvider.otherwise('/');
            }]);
})();