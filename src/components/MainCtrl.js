angular.module('app').controller('MainCtrl', ['$scope', '$stateParams', 'CategoryFactory', 'ProductFactory', 'CartFactory', function($scope, $stateParams, CategoryFactory, ProductFactory, CartFactory) {
  
	//$scope.categories = CategoryFactory.query();
	$scope.categories = CategoryFactory.query({id: $stateParams.id});
	
	$scope.products = ProductFactory.query();
	
	$scope.cartAdd = function(id){
		CartFactory.cartAdd(id);
	};
	
	$scope.cartRemove = function(productId){
		CartFactory.cartRemove(productId);
	};
	
	$scope.total = function(){
		return CartFactory.calculateTotal();
	};
	
	$scope.totalItems = function(){
		return CartFactory.calculateItems();
	};
	
	$scope.cart = CartFactory.getCart();
	
	$scope.interval = 3000;
	
	$scope.order = function() {
		$scope.validation = true;
		alert($scope.cart);
	};
	
	/*$scope.indexOf = function(list, id){
		IndexFactory.indexOf(list, id);
	};*/
	
	indexOf = function(list, id) {
		for (var i = 0; i < list.length; i++) {
			if (list[i].id === id) { 
				return i; 
			}
		}
		return -1;
	};
	
	getCategory = function(categoryId) {
		console.log(categoryId);
		return 'abc';
		/*categories.forEach(function(item){
			console.log(item);
			if (item.id === categoryId){
				console.log(item.category);
				return item.category;
			} 
		});*/
		
	};
	
}]);
