(function () {
    angular
        .module('user')
        .controller('loginController', loginController);

    loginController.$inject = ['$scope', '$state', 'userService'];

    function loginController($scope, $state, userService) {
        var vm = this;

        if (userService.getCurrentUser()) {
            $state.go('chat');
        }

        vm.user = {
            name: '',
            password: ''
        };

        vm.submit = function () {
            userService.login(vm.user)
                .then(function () {
                    $state.go('chat');
                })
                .catch(function () {
                    $scope.loginForm.$setPristine();
                    vm.user.password = '';
                });
        };
    }
})();