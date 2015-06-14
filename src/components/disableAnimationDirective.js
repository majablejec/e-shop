//ng-animate and ui-bootstrap are not compatible
//this directive sorts it out
//The question found at: http://stackoverflow.com/questions/22641834/angularjs-corousel-stops-working
//the solution found at: https://github.com/angular-ui/bootstrap/issues/1350 by simonykq commented on Feb 10, 2014

angular.module('app').directive('disableAnimation', function($animate){
    return {
        restrict: 'A',
        link: function($scope, $element, $attrs){
            $attrs.$observe('disableAnimation', function(value){
                $animate.enabled(!value, $element);
            });
        }
    }
});
