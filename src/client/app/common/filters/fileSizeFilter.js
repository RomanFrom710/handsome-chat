(function () {
    'use strict';

    angular
        .module('common')
        .filter('fileSize', function () {
            return fileSizeFilter;
        });

    var units = ['bytes', 'KB', 'MB', 'GB', 'TB'];
    var precision = 2;

    function fileSizeFilter(size) {
        var unit = 0;

        while (size >= 1024) {
            size /= 1024;
            unit ++;
        }

        return bytes.toFixed(precision) + ' ' + units[unit];
    }
})();