angular.module('app').controller('CategoryCtrl', ['$scope', 'CategoryFactory', function($scope, CategoryFactory) {
	
	$scope.categories = CategoryFactory.query({id: $stateParams.id});
	
}]);