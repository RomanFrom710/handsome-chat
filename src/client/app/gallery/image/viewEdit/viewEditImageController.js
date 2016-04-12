(function () {
    'use strict';

    angular
        .module('gallery')
        .controller('viewEditImageController', viewEditImageController);

    viewEditImageController.$inject = ['image'];

    function viewEditImageController(image) {
        var vm = this;
        vm.image = image;
    }
})();