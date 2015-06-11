angular.module('app').controller('ModalInstanceController', ['$scope', 'total', 'totalItems', '$modalInstance', function($scope, total, totalItems, $modalInstance){

    $scope.total = total;
	
	$scope.totalItems = totalItems;

    $scope.ok = function() {
        $modalInstance.close('Success');
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('Dismissed');
    };

}]);