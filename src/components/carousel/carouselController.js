angular.module('app').controller('SliderController', function($scope){

    $scope.interval = 3000;

    $scope.slides = [{img:'http://lorempixel.com/400/200/sports', text:"Slide 1"}, {img: 'http://lorempixel.com/400/200', text:"Slide 2"}];

});