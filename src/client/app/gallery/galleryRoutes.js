(function () {
    'use strict';

    angular
        .module('gallery')
        .config(['modalStateProvider', 'environment',
            function (modalStateProvider, env) {
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
                    });
            }]);
})();