(function () {
    'use strict';

    angular
        .module('gallery')
        .directive('imagePreview', imagePreviewDirective);

    imagePreviewDirective.$inject = ['lodash'];

    function imagePreviewDirective(_) {
        return {
            restrict: 'E',
            scope: {
                fileInput: '@'
            },
            replace: true,
            template: '<img ng-show="visible" class="image-preview" />',
            link: function (scope, element) {
                var fileUploadElement = angular.element(document.getElementById(scope.fileInput));

                fileUploadElement.on('change', function () {
                    var isImage = this.files &&
                                  this.files[0] &&
                                  _.startsWith(this.files[0].type, 'image');
                    if (!isImage) {
                        return;
                    }
                    scope.visible = true;

                    var reader = new FileReader();
                    reader.onload = function (event) {
                        element.attr('src', event.target.result);
                    };
                    reader.readAsDataURL(this.files[0]);
                });
            }
        }
    }
})();