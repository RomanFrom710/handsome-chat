(function () {
    'use strict';

    angular
        .module('gallery')
        .controller('profileController', profileController);

    profileController.$inject = ['profile'];

    function profileController(profile) {
        var vm = this;

        vm.user = profile;
    }
})();