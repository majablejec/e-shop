angular.module('app').controller('ModalInstanceController', ['CartFactory', function($scope, input, $modalInstance, CartFactory){

	//$scope.data = input;
	
	input = function(){
		return CartFactory.calculateTotal();
	};

    $scope.total = input;

    $scope.ok = function() {
        $modalInstance.close('Success');
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('Dismissed');
    };

}]);