(function () {
    angular
        .module('chat')
        .directive('messagesArea', messagesAreaDirective);

    messagesAreaDirective.$inject = ['environment'];

    function messagesAreaDirective(env) {
        return {
            restrict: 'E',
            templateUrl: env.templatesUrl + 'chat/messagesArea/messagesArea.html',
            scope: {

            },
            link: function (scope, element, attrs) {

            }
        }
    }
})();