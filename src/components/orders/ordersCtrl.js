angular.module('app').controller('OrdersCtrl', ['$scope', 'OrdersFactory', 'CartFactory', function($scope, OrdersFactory, CartFactory) {
	
	$scope.total = function(){
		return CartFactory.calculateTotal();
	};
	
	$scope.totalItems = function(){
		return CartFactory.calculateItems();
	};
	
	$scope.cart = CartFactory.getCart();

	$scope.orders = function(firstName, lastName, email, address, country, city, zip, cart){
		
		var newOrder = new OrdersFactory
		(
		
			{
				"firstName": firstName, 
				
				"lastName": lastName,
				
				"email": email, 
				
				"address": address,
				
				"country": country,
				
				"city": city,
				
				"zip": zip,
				
				"products": cart 
			}
		);
		
		console.log(newOrder);
	
		newOrder.$save().then(function(success){
			alert("Your payment has been successfuly made.");
		}, function(error){
			alert("Something went wrong with your payment. Please try again or contact ...");
		});;
	
	};
	
}]);

