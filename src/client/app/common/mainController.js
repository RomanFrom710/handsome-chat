(function () {
    angular
        .module('common')
        .controller('mainController', mainController);

    mainController.$inject = ['$state', 'userService', 'socketService'];

    function mainController($state, userService, socketService) {
        var vm = this;

        vm.getCurrentUser = userService.getCurrentUser;
        if (vm.getCurrentUser()) {
            socketService.connect();
        }

        vm.logout = function () {
            userService.logout()
                .then(function () {
                    $state.go('login');
                });
        };
    }
})();