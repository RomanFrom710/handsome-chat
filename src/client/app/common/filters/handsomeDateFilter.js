(function () {
    'use strict';

    angular
        .module('common')
        .filter('handsomeDate', handsomeDateFilter);

    var onlyTime = 'HH:mm:ss';
    var timeWithDate = 'MMMM d, y, HH:mm:ss';

    handsomeDateFilter.$inject = ['dateFilter'];

    function handsomeDateFilter(dateFilter) {
        return filterFunction;

        function filterFunction(date) {
            var todayString = (new Date()).toDateString();
            var dateObject = new Date(date);

            var format;
            if (todayString === dateObject.toDateString()) {
                format = onlyTime;
            } else {
                format = timeWithDate;
            }

            return dateFilter(date, format);
        }
    }
})();