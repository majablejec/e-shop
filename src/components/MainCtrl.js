angular.module('app').controller('MainCtrl', ['$scope', '$stateParams', 'CategoryFactory', 'CartFactory', function($scope, $stateParams, CategoryFactory, CartFactory) {

	// Če tega v MainCtrl ni, se modal (Cart Summary) ne odpre
	/*$scope.total = function(){
		return CartFactory.calculateTotal();
	};
	
	// Če tega v mainCtrl ni, se modal (Cart Summary) ne odpre
	$scope.totalItems = function(){
		return CartFactory.calculateItems();
	};*/
	
	// Nujno, da category.html prepozna stateParamsId
	$scope.stateParamsId = $stateParams.id;
	
	// Brez $scope.categories funkciji getCategory in getCategoryName ne delata
	//TypeError: Cannot read property 'forEach' of undefined
	
	$scope.categories = CategoryFactory.query({id: $stateParams.id});
	
	// Ne znam je prestaviti v CategoryFactoryPart2
	$scope.getCategory = function(id) {
		//console.log(id);
		var result;
		$scope.categories.forEach(function(item){
			if(item.id == id) {
				result = item;
			}
	});

	return result;

	};
	
	// Ne znam je prestaviti v CategoryFactoryPart2
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
