(function () {
    angular
        .module('chat')
        .directive('messagesArea', messagesAreaDirective);

    messagesAreaDirective.$inject = ['chatService', 'environment'];

    function messagesAreaDirective(chatService, env) {
        return {
            restrict: 'E',
            templateUrl: env.templatesUrl + 'chat/messagesArea/messagesArea.html',
            scope: {

            },
            link: function (scope) {
                scope.messages = [];
                scope.currentMessage = '';

                scope.send = function () {
                    chatService.sendMessage(scope.currentMessage);
                };

                chatService.onMessage(function (messageData) {
                    scope.currentMessage = '';
                    scope.messages.push(messageData);
                });
            }
        }
    }
})();