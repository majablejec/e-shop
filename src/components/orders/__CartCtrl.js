angular.module('app').controller('CartCtrl', ['$scope', 'CartFactory', function($scope, CartFactory) {
	
	$scope.cartAdd = function(id){
		CartFactory.cartAdd(id);
	};
	
	$scope.total = CartFactory.calculateTotal();
	
	$scope.cart = CartFactory.getCart();
	
}]);