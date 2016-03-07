(function () {
    angular
        .module('user')
        .controller('loginController', loginController);

    loginController.$inject = ['$state', 'userService'];

    function loginController($state, userService) {
        var vm = this;

        vm.user = {
            name: '',
            password: ''
        };

        vm.submit = function () {
            userService.login(vm.user)
                .then(function () {
                    $state.go('chat');
                });
        }
    }
})();