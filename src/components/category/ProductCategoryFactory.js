angular.module('app').factory('ProductCategoryFactory', function ($resource) {

	return $resource('http://smartninja.betoo.si/api/eshop/categories/:id/products', {onlyStocked:true});
    
});