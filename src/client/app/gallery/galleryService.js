(function () {
    'use strict';

    angular
        .module('gallery')
        .service('galleryService', GalleryService);

    GalleryService.$inject = ['Restangular', '$q'];

    function GalleryService(Restangular, $q) {
        var fileRules;
        this.getFileRules = function () {
            if (fileRules) {
                var deferred = $q.defer();
                deferred.resolve(fileRules);
                return deferred.promise;
            } else {
                return Restangular.one('gallery/filerules').get()
                    .then(function (response) {
                        fileRules = response; // Caching file rules.
                        return response;
                    });
            }
        };
        
        
    }
})();