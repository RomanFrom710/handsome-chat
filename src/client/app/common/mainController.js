(function () {
    angular
        .module('common')
        .controller('mainController', mainController);

    mainController.$inject = ['$state', 'userService'];

    function mainController($state, userService) {
        var vm = this;

        vm.getCurrentUser = userService.getCurrentUser;

        vm.logout = function () {
            userService.logout()
                .then(function () {
                    $state.go('login');
                });
        };
    }
})();