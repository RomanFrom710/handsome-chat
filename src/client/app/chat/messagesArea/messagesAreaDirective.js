(function () {
    angular
        .module('chat')
        .directive('messagesArea', messagesAreaDirective);

    messagesAreaDirective.$inject = ['userService', 'chatService', 'environment'];

    function messagesAreaDirective(userService, chatService, env) {
        return {
            restrict: 'E',
            templateUrl: env.templatesUrl + 'chat/messagesArea/messagesArea.html',
            scope: {
                messages: '='
            },
            link: function (scope) {
                scope.currentMessage = '';
                scope.currentUser = userService.getCurrentUser();

                scope.send = function () {
                    chatService.sendMessage(scope.currentMessage);
                    scope.currentMessage = '';
                };

                chatService.onMessage(function (messageData) {
                    scope.messages.push(messageData);
                });
            }
        }
    }
})();