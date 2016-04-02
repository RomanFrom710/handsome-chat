(function () {
    angular
        .module('common')
        .filter('fileExtensions', function () {
            return fileExtensionsFilter;
        });

    function fileExtensionsFilter(extensions) {
        var extensionsWithDot = extensions.map(function (extension) {
            return '.' + extension;
        });

        return extensionsWithDot.join(', ');
    }
})();