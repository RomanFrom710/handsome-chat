(function () {
    'use strict';

    angular
        .module('common')
        .directive('imageErrorPlaceholder', imageErrorPlaceholderDirective);

    function imageErrorPlaceholderDirective() {
        return {
            restrict: 'A',
            scope: {
                placeholder: '@imageErrorPlaceholder'
            },
            link: function (scope, element) {
                if (element[0].tagName.toLowerCase() !== 'img') {
                    return;
                }

                element.on('error', function (event) {
                    // There is no way to remove errors in console in Chrome,
                    // but in other browsers this method helps.
                    event.preventDefault();

                    var placeholderElement = angular.element('<em><em/>');
                    placeholderElement.text(scope.placeholder);
                    element.replaceWith(placeholderElement);
                });
            }
        }
    }
})();