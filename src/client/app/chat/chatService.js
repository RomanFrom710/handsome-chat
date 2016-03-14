(function () {
    angular
        .module('chat')
        .service('chatService', ChatService);

    ChatService.$inject = ['socketService'];

    function ChatService(socketService) {
        this.onMessage = function (callback) {
            socketService.on('message', callback);
        };

        this.sendMessage = function (message) {
            socketService.emit('message', { content: message })
        }
    }
})();