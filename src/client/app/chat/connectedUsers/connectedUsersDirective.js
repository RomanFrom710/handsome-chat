(function () {
    angular
        .module('chat')
        .directive('connectedUsers', connectedUsersDirective);

    connectedUsersDirective.$inject = ['environment'];

    function connectedUsersDirective(env) {
        return {
            restrict: 'E',
            templateUrl: env.templatesUrl + 'chat/connectedUsers/connectedUsers.html',
            scope: {

            },
            link: function (scope, element, attrs) {

            }
        }
    }
})();