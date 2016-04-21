(function () {
    'use strict';

    angular
        .module('gallery')
        .controller('viewEditImageController', viewEditImageController);

    viewEditImageController.$inject = ['$state', 'galleryService', 'userService', 'chatService', 'image', 'toastr'];

    function viewEditImageController($state, galleryService, userService, chatService, image, toastr) {
        var vm = this;
        vm.image = image;
        
        vm.editMode = false;
        vm.isOwner = userService.getCurrentUser().id === image.author.id;
        vm.isSingleImage = $state.is('chat.singleImage');

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

        vm.send = function () {
            chatService.sendImage(vm.image.id);
            $state.go('chat');
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
                    $state.go('^', {}, { reload: !vm.isSingleImage });
                });
        };
    }
})();