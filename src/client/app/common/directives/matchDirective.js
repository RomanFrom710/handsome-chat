(function () {
    'use strict';

    angular
        .module('common')
        .directive('match', matchDirective);

    function matchDirective() {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                otherValue: '=match'
            },
            link: function (scope, element, attrs, ngModel) {
                ngModel.$validators.match = function (value) {
                    return value === scope.otherValue;
                };

                scope.$watch('otherValue', function () {
                    ngModel.$validate();
                });
            }
        }
    }
})();