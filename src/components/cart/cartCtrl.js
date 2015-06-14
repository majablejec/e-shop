angular.module('app').controller('CartCtrl', ['$scope', 'CartFactory', function($scope, CartFactory) {
	
	$scope.cart = CartFactory.getCart();
	
	$scope.cartRemove = function(productId){
		CartFactory.cartRemove(productId);
	};
	
	$scope.total = function(){
		return CartFactory.calculateTotal();
	};
	
	$scope.totalItems = function(){
		return CartFactory.calculateItems();
	};
	
}]);
