//Tega factory mi ni uspelo narediti skupaj s Categoryfactory. Nisem vedela, kako naj poleg funkcije getCategory returnam še $resource.

angular.module('app').factory('CategoryFactoryPart2', ['$scope', function ($scope) {
	
	
	return {
		getCategoryName : function(categoryId) {
			var result;
			$scope.categories.forEach(function(item){
				if(item.id == categoryId) {
					result = item.category;
				}
			});

			return result;
		
		}
	}
	
	
	/*
	return {
		
		getCategory : function(id) {
			var result;
			$scope.categories.forEach(function(item){
				if(item.id == id) {
					result = item;
				}
		});

		return result;

		}
	};
	*/
    
}]);
