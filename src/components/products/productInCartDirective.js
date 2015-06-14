angular.module('app').directive('productInCart', function(){
	return {
		restrict: 'E',
		templateUrl: 'templates/productInCart.html',
		controller: function ($scope, CartFactory)
		{
			$scope.cart = CartFactory.getCart();
			
			$scope.cartAdd = function(id){
				CartFactory.cartAdd(id);
			};
			
			// Te funkcije mi ni uspelo prestaviti v CategoryFactoryPart2
			// Error: [$injector:unpr] Unknown provider: $scopeProvider <- $scope <- CategoryFactoryPart2
			// T U K A J
			
			/*$scope.getCategoryName = function(categoryId) {
				var result;
				$scope.categories.forEach(function(item){
					if(item.id == categoryId) {
						result = item.category;
					}
				});

				return result;
			
			};*/
			
			//$scope.getCategoryName = function(id){
				//CategoryFactoryPart2.getCategoryName(id);
			//};
		}
	};
});