angular.module('app').directive('appCarousel', function(){
	return {
		restrict: 'E',
		controller: 'SliderController',
		templateUrl: 'templates/carousel-template.html'
	};
});