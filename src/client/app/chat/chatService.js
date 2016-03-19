(function () {
    angular
        .module('chat')
        .service('chatService', ChatService);

    ChatService.$inject = ['Restangular', 'socketService'];

    function ChatService(Restangular, socketService) {
        this.onMessage = function (callback) {
            socketService.on('message', callback);
        };

        this.sendMessage = function (message) {
            socketService.emit('message', { content: message })
        };

        this.getLastMessages = function () {
            return Restangular.all('chat/lastMessages').getList();
        };
    }
})();