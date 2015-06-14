angular.module('app').controller('CategoryCtrl', ['$scope', '$stateParams', 'ProductCategoryFactory', 'CartFactory', function($scope, $stateParams, ProductCategoryFactory, CartFactory) {
	
	//$scope.categories = CategoryFactory.query({id: $stateParams.id});
	$scope.productsInCategory = ProductCategoryFactory.query({id: $stateParams.id});
	
	$scope.cartAdd = function(id){
		CartFactory.cartAdd(id);
	};
	
}]);