(function () {
    angular
        .module('chat')
        .controller('chatController', chatController);

    chatController.$inject = ['lastMessages'];

    function chatController(lastMessages) {
        var vm = this;

        vm.messages = lastMessages;
    }
})();