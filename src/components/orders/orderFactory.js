angular.module('app').factory('OrderFactory', function($resource){
	
	return $resource('http://smartninja.betoo.si/api/eshop/orders');

});