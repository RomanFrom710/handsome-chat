(function () {
    angular
        .module('common')
        .controller('mainController', mainController);

    mainController.$inject = ['$state', 'userService'];

    function mainController($state, userService) {
        var vm = this;

        vm.currentUser = userService.getCurrentUser();
    }
})();