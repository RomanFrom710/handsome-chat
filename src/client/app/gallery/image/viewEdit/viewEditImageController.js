(function () {
    'use strict';

    angular
        .module('gallery')
        .controller('viewEditImageController', viewEditImageController);

    viewEditImageController.$inject = ['$state', 'galleryService', 'userService', 'image', 'toastr'];

    function viewEditImageController($state, galleryService, userService, image, toastr) {
        var vm = this;
        vm.image = image;
        
        vm.editMode = false;
        vm.canEdit = userService.getCurrentUser() === image.author.name;

        vm.save = function () {
            var imageDto = { description: vm.image.description };
            galleryService.updateImage(vm.image.id, imageDto)
                .then(function () {
                    toastr.success('The image was successfully updated!');
                    vm.editMode = false;
                })
                .catch(function () {
                    $state.reload();
                });
        };
        
        vm.close = function () {
            $state.go('^');
        };
        
        vm.triggerEditMode = function () {
            vm.editMode = !vm.editMode;
        };

        vm.delete = function () {
            galleryService.deleteImage(vm.image.id)
                .then(function () {
                    toastr.success('Image was deleted successfully!');
                    vm.close();
                });
        };
    }
})();