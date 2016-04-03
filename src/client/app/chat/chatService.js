(function () {
    'use strict';

    angular
        .module('chat')
        .service('chatService', ChatService);

    ChatService.$inject = ['Restangular', 'socketService'];

    function ChatService(Restangular, socketService) {
        this.onMessage = function (callback) {
            socketService.on('message', callback);
        };

        this.onUserJoined = function (callback) {
            socketService.on('joined', callback);
        };

        this.onUserLeft = function (callback) {
            socketService.on('left', callback);
        };

        this.sendMessage = function (message) {
            socketService.emit('message', { content: message })
        };

        this.getLastMessages = function () {
            return Restangular.all('chat/lastMessages').getList();
        };

        this.getOnlineUsers = function () {
            return Restangular.all('chat/onlineUsers').getList();
        };
    }
})();