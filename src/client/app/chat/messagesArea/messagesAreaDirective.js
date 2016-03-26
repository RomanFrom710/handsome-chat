(function () {
    angular
        .module('chat')
        .directive('messagesArea', messagesAreaDirective);

    messagesAreaDirective.$inject = ['userService', 'chatService', 'lodash', 'environment'];

    function messagesAreaDirective(userService, chatService, _, env) {
        return {
            restrict: 'E',
            templateUrl: env.templatesUrl + 'chat/messagesArea/messagesArea.html',
            scope: {
                messages: '='
            },
            link: function (scope, element) {
                var messagesElement = element[0].querySelector('.messages');
                var inputElement = element[0].querySelector('.message-input');
                
                scope.currentMessage = '';
                scope.currentUser = userService.getCurrentUser();

                scope.send = function () {
                    var message = _.trim(scope.currentMessage);
                    chatService.sendMessage(message);
                    scope.currentMessage = '';
                    inputElement.focus();
                };

                chatService.onMessage(function (messageData) {
                    scope.messages.push(messageData);
                });

                scope.$watchCollection('messages', function () {
                    messagesElement.scrollTop = messagesElement.scrollHeight;
                });
            }
        }
    }
})();