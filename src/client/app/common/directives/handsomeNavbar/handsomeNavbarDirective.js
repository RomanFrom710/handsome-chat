(function () {
    'use strict';

    angular
        .module('common')
        .directive('handsomeNavbar', handsomeNavbarDirective);

    handsomeNavbarDirective.$inject = ['$state', 'userService', 'environment'];

    function handsomeNavbarDirective($state, userService, env) {
        return {
            restrict: 'E',
            templateUrl: env.templatesUrl + 'common/directives/handsomeNavbar/handsomeNavbar.html',
            scope: {},
            link: function (scope) {
                scope.isLoggedIn = function () {
                    return userService.isLoggedIn();
                };

                scope.getUserName = function () {
                    return userService.getCurrentUser().name;
                };
                
                scope.openProfile = function () {
                    var userId = userService.getCurrentUser().id;
                    $state.go('chat.profile', { userId: userId });
                };
                
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