angular.module('app').directive('cartEmpty', function(){
	return {
		restrict: 'E',
		//template: '<p>hello</p>',
		templateUrl: 'templates/cartEmpty.html',
	};
});