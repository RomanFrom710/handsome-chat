(function () {
    'use strict';

    angular
        .module('statistics')
        .controller('statisticsController', statisticsController);

    statisticsController.$inject = ['statistics'];

    function statisticsController(statistics) {
        var vm = this;

        vm.statistics = statistics.data;
    }
})();