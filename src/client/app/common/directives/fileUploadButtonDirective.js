(function () {
    'use strict';

    angular
        .module('common')
        .directive('fileUploadButton', fileUploadButtonDirective);

    function fileUploadButtonDirective() {
        return {
            restrict: 'A',
            scope: {
                fileInput: '@fileUploadButton'
            },
            link: function (scope, element) {
                var fileUploadElement = document.getElementById(scope.fileInput);

                element.on('click', function () {
                    fileUploadElement.click();
                });
            }
        }
    }
})();