(function () {
    'use strict';

    angular
        .module('gallery')
        .directive('imagePreview', imagePreviewDirective);

    imagePreviewDirective.$inject = ['lodash', '$window', 'environment'];

    var placeholder = '/images/placeholder.png';

    function imagePreviewDirective(_, $window, env) {
        return {
            restrict: 'E',
            scope: {
                fileInput: '@',
                api: '='
            },
            replace: true,
            templateUrl: env.templatesUrl + 'gallery/image/preview/imagePreview.html',
            link: function (scope, element) {
                var fileUploadElement = document.getElementById(scope.fileInput);
                scope.imageData = placeholder;

                var apiObject = scope.api || {};
                apiObject.update = function () {
                    var files = fileUploadElement.files;
                    if (!(files && files[0])) {
                        scope.imageData = placeholder;
                        return;
                    }

                    scope.imageData = $window.URL.createObjectURL(files[0]);
                };

                apiObject.remove = function () {
                    scope.imageData = placeholder;
                }
            }
        }
    }
})();