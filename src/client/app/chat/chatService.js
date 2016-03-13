(function () {
    angular
        .module('chat')
        .service('chatService', ChatService);

    ChatService.$inject = ['socketService'];

    function ChatService(socketService) {

    }
})();