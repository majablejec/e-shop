angular.module('app').directive('product', function(){
	return {
		restrict: 'E',
		templateUrl: 'templates/product.html',
		controller: function ($scope, CartFactory)
		{
			$scope.cartAdd = function(id){
				CartFactory.cartAdd(id);
			};
		}
	};
});