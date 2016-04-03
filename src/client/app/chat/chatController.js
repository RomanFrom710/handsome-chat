(function () {
    'use strict';

    angular
        .module('chat')
        .controller('chatController', chatController);

    chatController.$inject = ['lastMessages', 'onlineUsers'];

    function chatController(lastMessages, onlineUsers) {
        var vm = this;

        vm.messages = lastMessages;
        vm.onlineUsers = onlineUsers;
    }
})();