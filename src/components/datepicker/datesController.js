angular.module('app').controller('DatesController', function($scope){

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };
});