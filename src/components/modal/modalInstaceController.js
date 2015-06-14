angular.module('app').controller('ModalInstanceController', [
	'$scope', 
	'total', 
	'totalItems', 
	'$modalInstance', 
	'OrdersFactory', 
	'CartFactory',
	function(
		$scope, 
		total, 
		totalItems, 
		$modalInstance, 
		OrdersFactory, 
		CartFactory
	){

    $scope.total = total;
	
	$scope.totalItems = totalItems;

    $scope.ok = function() {
        $modalInstance.close("ok");
    };

    $scope.cancel = function() {
        $modalInstance.dismiss();
    };
	
}]);