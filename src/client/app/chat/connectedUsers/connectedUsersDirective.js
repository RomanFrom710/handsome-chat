(function () {
    angular
        .module('chat')
        .directive('connectedUsers', connectedUsersDirective);

    connectedUsersDirective.$inject = ['userService', 'chatService', 'lodash', 'environment'];

    function connectedUsersDirective(userService, chatService, _, env) {
        return {
            restrict: 'E',
            templateUrl: env.templatesUrl + 'chat/connectedUsers/connectedUsers.html',
            scope: {
                users: '='
            },
            link: function (scope) {
                var currentUser = userService.getCurrentUser();

                chatService.onUserJoined(function (user) {
                    var isCurrent = user.name !== currentUser;
                    // Fixing case, when server reloads and we recieve 'join' event
                    // of users who had been already connected and therefore duplicates
                    // appear in users list. It's not a good idea to handle it in such
                    // an ugly way, so need to try find better approach.
                    var isExisting = _.findIndex(scope.users, { name: user.name }) !== -1;
                    if (isCurrent && !isExisting) {
                        scope.users.push(user);
                    }
                });
                
                chatService.onUserLeft(function (userId) {
                    _.remove(scope.users, { id: userId });
                });
            }
        }
    }
})();