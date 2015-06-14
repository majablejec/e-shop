angular.module('app').controller('NavCtrl', ['$scope', '$stateParams', 'CategoryFactory', 'CartFactory', function($scope, $stateParams, CategoryFactory, CartFactory) {
	
	// Izpis kategorij v glavnem meniju
	$scope.categories = CategoryFactory.query({id: $stateParams.id});
	
	// Število produktov v košarici
	$scope.totalItems = function(){
		return CartFactory.calculateItems();
	};
	
}]);
