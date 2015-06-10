angular.module('app').directive('appDatepicker', function(){
    return {
        restrict: 'E',
        controller: 'DatesController',
        templateUrl: 'templates/datepicker-template.html'
    };
});