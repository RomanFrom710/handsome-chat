(function () {
    angular
        .module('user')
        .controller('registerController', registerController);

    registerController.$inject = ['$scope', 'userService'];

    function registerController($scope, userService) {
        var vm = this;

        vm.user = {
            name: '',
            password: ''
        };

        vm.submit = function () {
            userService.register(vm.user);
        }
    }
})();