(function () {
    angular
        .module('user')
        .controller('registerController', registerController);

    registerController.$inject = ['$state', 'userService'];

    function registerController($state, userService) {
        var vm = this;

        vm.user = {
            name: '',
            password: ''
        };

        vm.submit = function () {
            userService.register(vm.user)
                .then(function () {
                    $state.go('chat');
                });
        }
    }
})();