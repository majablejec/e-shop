angular.module('app').controller('TimeController', function($scope){

    $scope.mytime = new Date();

	$scope.hstep = 1;
	$scope.mstep = 1;
	
	$scope.ismeridian = true;
	$scope.toggleMode = function() {
		$scope.ismeridian = ! $scope.ismeridian;
	};

	
});