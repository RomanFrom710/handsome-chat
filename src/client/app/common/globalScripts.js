(function () {
    'use strict';

    angular
        .module('common')
        .provider('lodash', function () {
            this.$get = function () { return _; };
        })
        .provider('io', function () {
            this.$get = function () { return io; };
        });
})();