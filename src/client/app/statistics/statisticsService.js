(function () {
    'use strict';

    angular
        .module('statistics')
        .service('statisticsService', StatisticsService);

    StatisticsService.$inject = ['Restangular'];

    function StatisticsService(Restangular) {
        this.getStatistics = function () {
            return Restangular.one('statistics').get();
        };
    }
})();