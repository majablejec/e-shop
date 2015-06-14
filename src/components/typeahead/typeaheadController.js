angular.module('app').controller('TypeController', function($scope, $http){
	
    $scope.getItems = function(query){
        return $http.get('http://smartninja.betoo.si/api/eshop/products', {params:{query : query}}).then(function(response) {
            return response.data;
        })
    };
	
	$scope.emptySearch = function(){
		alert("izprazni");
	};
	
});
