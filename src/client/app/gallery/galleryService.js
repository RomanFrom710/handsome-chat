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
                return Restangular.one('gallery').one('filerules').get()
                    .then(function (response) {
                        fileRules = response; // Caching file rules.
                        return response;
                    });
            }
        };
        
        this.getImage = function (userId, imageId) {
            return Restangular.one('gallery', userId).one(imageId).get();
        };

        this.likeImage = function (userId, imageId) {
            return Restangular.one('gallery', userId).one(imageId).one('like').post();
        };
        
        this.unlikeImage = function (userId, imageId) {
            return Restangular.one('gallery', userId).one(imageId).one('unlike').post();
        };
        
        this.updateImage = function (imageId, imageDto) {
            return Restangular.one('gallery', imageId).customPUT(imageDto);
        };
        
        this.deleteImage = function (imageId) {
            return Restangular.one('gallery', imageId).remove();
        };

        this.getProfile = function (userId) {
            return Restangular.one('user', userId).get();
        };
    }
})();