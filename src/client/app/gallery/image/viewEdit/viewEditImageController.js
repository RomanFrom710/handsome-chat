(function () {
    'use strict';

    angular
        .module('gallery')
        .controller('viewEditImageController', viewEditImageController);

    viewEditImageController.$inject = ['$state', 'galleryService', 'image', 'toastr'];

    function viewEditImageController($state, galleryService, image, toastr) {
        var vm = this;
        vm.image = image;

        vm.save = function () {
            var imageDto = { description: vm.image.description };
            galleryService.updateImage(vm.image.id, imageDto)
                .then(function () {
                    toastr.success('The image was successfully updated!');
                    $state.go('^');
                });
        };
        
        vm.close = function () {
            $state.go('^');
        };
    }
})();