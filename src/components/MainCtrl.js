angular.module('app').controller('MainCtrl', ['$scope', '$stateParams', 'CategoryFactory', 'ProductFactory', 'CartFactory', 'ProductCategoryFactory', function($scope, $stateParams, CategoryFactory, ProductFactory, CartFactory, ProductCategoryFactory) {
  
	//$scope.categories = CategoryFactory.query();
	$scope.categories = CategoryFactory.query({id: $stateParams.id});
	
	$scope.products = ProductFactory.query();
	
	$scope.productsInCategory = ProductCategoryFactory.query({id: $stateParams.id});
	
	
	// CART
	
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
	
	// SLIDER
	// Če intervala ni v MainControlerju, se sider ne vrti
	
	$scope.interval = 3000;
	
	// ORDER
	
	$scope.order = function() {
		$scope.validation = true;
		alert($scope.cart);
	};
	
	// IndexOf
	
	/*$scope.indexOf = function(list, id){
		IndexFactory.indexOf(list, id);
	};*/
	
	
	$scope.indexOf = function(list, id) {
		console.log('id:' + id);
		console.log('list:' + angular.toJson(list));
		for (var i = 0; i < list.length; i++) {
			console.log('v for zanki');
			if (list[i].id === id) { 
				console.log('list[i].id:' + list[i].id);
				console.log('i:' + i);
				return i; 
			}
		}
		return -1;
	};
	
	/*
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
		
	/*};*/
	
	$scope.stateParamsId = $stateParams.id;
	
	
	$scope.getCategory = function(id) {
		var result;
		$scope.categories.forEach(function(item){
			if(item.id == id) {
				result = item;
			}
		});

		return result;
	
	};
	
	$scope.getCategoryName = function(categoryId) {
		var result;
		$scope.categories.forEach(function(item){
			if(item.id == categoryId) {
				result = item.category;
			}
		});

		return result;
	
	};

}]);
