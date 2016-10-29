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
                        url: 'image/:userId/:imageId',
                        templateUrl: env.templatesUrl + 'gallery/image/viewEdit/viewEditImage.html',
                        controller: 'viewEditImageController',
                        controllerAs: 'vm',
                        size: 'full',
                        resolve: {
                            image: ['galleryService', '$stateParams',
                                function (galleryService, $stateParams) {
                                    return galleryService.getImage($stateParams.userId, $stateParams.imageId);
                                }]
                        }
                    })
                    .state('chat.profile', {
                        url: 'profile/:userId',
                        templateUrl: env.templatesUrl + 'gallery/profile/profile.html',
                        controller: 'profileController',
                        controllerAs: 'vm',
                        size: 'full',
                        resolve: {
                            profile: ['galleryService', '$stateParams',
                                function (galleryService, $stateParams) {
                                    return galleryService.getProfile($stateParams.userId);
                                }]
                        }
                    })
                    .state('chat.statistics', {
                        url: 'statistics',
                        templateUrl: env.templatesUrl + 'statistics/statistics.html',
                        controller: 'statisticsController',
                        controllerAs: 'vm',
                        resolve: {
                            statistics: ['statisticsService', function (statisticsService) {
                                return statisticsService.getStatistics();
                            }]
                        }
                    })
                    .state('chat.profile.image', {
                        url: '/:imageId',
                        templateUrl: env.templatesUrl + 'gallery/image/viewEdit/viewEditImage.html',
                        controller: 'viewEditImageController',
                        controllerAs: 'vm',
                        size: 'full',
                        resolve: {
                            image: ['galleryService', '$stateParams',
                                function (galleryService, $stateParams) {
                                    return galleryService.getImage($stateParams.userId, $stateParams.imageId);
                                }]
                        }
                    });
                
                $urlRouterProvider.otherwise('/');
            }]);
})();