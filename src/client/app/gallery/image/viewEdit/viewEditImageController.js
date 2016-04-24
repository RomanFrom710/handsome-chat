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

        var isLiking = false;
        vm.triggerLike = function () {
            if (isLiking) {
                return;
            }

            isLiking = true;
            var promise = vm.image.hasLiked ?
                galleryService.unlikeImage(vm.image.author.id, vm.image.id) :
                galleryService.likeImage(vm.image.author.id, vm.image.id);

            promise
                .then(function (likes) {
                    vm.image.likes = likes;
                    vm.image.hasLiked = !vm.image.hasLiked;
                })
                .finally(function () {
                    isLiking = false;
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
                    $state.go('^', {}, { reload: !vm.isSingleImage });
                });
        };
    }
})();