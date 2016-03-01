(function () {
    angular
        .module('user')
        .controller('loginController', loginController);

    loginController.$inject = ['userService'];

    function loginController(userService) {
        var vm = this;

        vm.user = {
            name: '',
            password: ''
        };

        vm.submit = function () {
            userService.login(vm.user);
        }
    }
})();