angular.module('app').directive('appCarousel', function(){
	return {
		restrict: 'E',
		//controller: 'SliderController',
		controller: 'MainCtrl',
		templateUrl: 'templates/carousel-template.html'
	};
});