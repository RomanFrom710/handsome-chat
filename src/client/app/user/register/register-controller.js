(function () {
    angular
        .module('user')
        .controller('registerController', registerController);

    registerController.$inject = ['userService'];

    function registerController(userService) {
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