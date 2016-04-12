(function () {
    'use strict';

    angular
        .module('chat')
        .directive('messagesArea', messagesAreaDirective);

    messagesAreaDirective.$inject = ['userService', 'chatService', '$timeout', '$uibModal', 'environment'];

    function messagesAreaDirective(userService, chatService, $timeout, $modal, env) {
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
                    chatService.sendMessage(scope.currentMessage);
                    scope.currentMessage = '';
                    inputElement.focus();
                };

                chatService.onMessage(function (messageData) {
                    scope.messages.push(messageData);
                });

                scope.$watchCollection('messages', function () {
                    $timeout(function () {
                        // We need to wait, because message
                        // has no content yet.
                        messagesElement.scrollTop = messagesElement.scrollHeight;
                    });
                    messagesElement.scrollTop = messagesElement.scrollHeight;
                });

                scope.openImageUpload = function () {
                    $modal.open({
                        templateUrl: env.templatesUrl + 'gallery/image/upload/uploadImage.html',
                        controller: 'uploadImageController',
                        controllerAs: 'vm',
                        size: 'lg',
                        resolve: {
                            fileRules: ['galleryService', function (galleryService) {
                                return galleryService.getFileRules();
                            }]
                        }
                    });
                };
            }
        }
    }
})();