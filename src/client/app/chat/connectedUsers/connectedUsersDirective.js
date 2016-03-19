(function () {
    angular
        .module('chat')
        .directive('connectedUsers', connectedUsersDirective);

    connectedUsersDirective.$inject = ['chatService', 'lodash', 'environment'];

    function connectedUsersDirective(chatService, _, env) {
        return {
            restrict: 'E',
            templateUrl: env.templatesUrl + 'chat/connectedUsers/connectedUsers.html',
            scope: {
                users: '='
            },
            link: function (scope) {
                chatService.onUserJoined(function (user) {
                    scope.users.push(user);
                });
                
                chatService.onUserLeft(function (userId) {
                    _.remove(scope.users, { id: userId });
                });
            }
        }
    }
})();