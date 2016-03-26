(function () {
    angular
        .module('common')
        .directive('notEmpty', notEmptyDirective);

    // This directive checks, if model contains only
    // whitespace characters.

    var notEmptyRegex = /[^\s]+/;

    function notEmptyDirective() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$validators.notEmpty = function (value) {
                    return notEmptyRegex.test(value);
                };
            }
        }
    }
})();