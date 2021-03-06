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
        if (!size) {
            return '0 ' + units[0];
        }

        var unit = 0;

        while (size >= 1024) {
            size /= 1024;
            unit++;
        }

        return size.toFixed(precision) + ' ' + units[unit];
    }
})();