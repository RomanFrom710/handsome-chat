(function () {
    'use strict';

    angular
        .module('common')
        .factory('lodash', function () {
            return _;
        })
        .factory('io', function () {
            return io;
        });
})();