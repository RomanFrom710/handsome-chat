(function () {
    'use strict';

    angular
        .module('gallery')
        .config(['$stateProvider', 'environment',
            function ($stateProvider, env) {
                $stateProvider
                    .state('chat.editImage', {
                        url: 'editImage/:id',
                        onEnter: ['$uibModal', 'galleryService', '$state', '$stateParams',
                            function ($modal, galleryService, $state, $stateParams) {
                                $modal.open({
                                    templateUrl: env.templatesUrl + 'gallery/image/viewEdit/viewEditImage.html',
                                    controller: 'viewEditImageController',
                                    controllerAs: 'vm',
                                    size: 'full',
                                    resolve: {
                                        image: galleryService.getImage($stateParams.id)
                                    }
                                }).result.finally(function () { $state.go('^'); });
                            }]
                    });
            }]);
})();