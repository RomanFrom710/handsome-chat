(function () {
    'use strict';

    angular
        .module('user')
        .controller('registerController', registerController);

    registerController.$inject = ['$scope', '$state', 'userService'];

    function registerController($scope, $state, userService) {
        var vm = this;

        if (userService.isLoggedIn()) {
            $state.go('chat');
        }

        vm.user = {
            name: '',
            password: ''
        };
        vm.confirmPassword = '';

        vm.submit = function () {
            userService.register(vm.user)
                .then(function () {
                    $state.go('chat');
                })
                .catch(function () {
                    $scope.registerForm.$setPristine();
                    vm.user.password = '';
                    vm.confirmPassword = '';
                });
        }
    }
})();