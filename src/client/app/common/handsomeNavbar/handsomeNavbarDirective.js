(function () {
    angular
        .module('common')
        .directive('handsomeNavbar', handsomeNavbarDirective);

    handsomeNavbarDirective.$inject = ['$state', 'userService', 'environment'];

    function handsomeNavbarDirective($state, userService, env) {
        return {
            restrict: 'E',
            templateUrl: env.templatesUrl + 'common/handsomeNavbar/handsomeNavbar.html',
            scope: {},
            link: function (scope) {
                scope.getCurrentUser = userService.getCurrentUser;
                
                scope.logout = function () {
                    userService.logout()
                        .then(function () {
                            $state.go('login');
                        });
                };
            }
        }
    }
})();