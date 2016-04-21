(function () {
    'use strict';

    angular
        .module('chat')
        .directive('message', messageDirective);

    messageDirective.$inject = ['userService', 'environment'];

    function messageDirective(userService, env) {
        return {
            restrict: 'E',
            templateUrl: env.templatesUrl + 'chat/message/message.html',
            scope: {
                message: '='
            },
            link: function (scope) {
                var currentUserId = userService.getCurrentUser().id;
                scope.hasImage = !!scope.message.image;
                scope.isMyMessage = currentUserId === scope.message.author.id;
                
                if (scope.hasImage) {
                    scope.imageStateParams = {
                        userId: scope.message.author.id,
                        imageId: scope.message.image.id
                    };
                }
            }
        }
    }
})();