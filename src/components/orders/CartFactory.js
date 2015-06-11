angular.module('app').factory('CartFactory', [ '$rootScope', function($rootScope){
  
	var cart = [];
	
	cartAddNew = function(product){
		product.quantity = 1;
		cart.push(product);
	};
	
	// Sem jo poskusila narediti univerzalno
	// Dala sem jo v MainCtrl kot $scope.indexOf.
	// Ampak je ne vleče, če ima $scope spredaj.
	// Samo, če ga nima.
	// Potemtakem pa ne more biti univerzalna in sem jo pustila kar tukaj v CartFactory
	indexOf = function(list, id) {
		for (var i = 0; i < list.length; i++) {
			if (list[i].id === id) { 
				return i; 
			}
		}
		return -1;
	}; 
	
	return {
		getCart : function() {
			return cart;
		},
		cartAdd : function(product){
			
			var match = false;
			
			if(cart.length !== 0){
				
				cart.forEach(function(item){
					if (item.id === product.id){
						match = true;
						cart[indexOf(cart, item.id)].quantity += 1;
					} 
				});
				
				if(!match) {
					cartAddNew(product);
				}
				
			} else {
				cartAddNew(product);
			}

		},
		cartRemove : function(productId) {
			console.log(productId);
			cart[indexOf(cart, productId)].quantity = 0;
			//itemToBeRemoved = cart[indexOf(cart, productId)];
			//console.log(itemToBeRemoved.id);
			//cart.splice(itemToBeRemoved, 1);
			console.log(angular.toJson(cart));
		},
		calculateTotal : function() {
			var total = 0;
			
			cart.forEach(function(item){							
				total += item.quantity * item.price;
			});		
			
			return total;
		},
		calculateItems : function() {
			var totalItems = 0;
			
			cart.forEach(function(item){
				totalItems += item.quantity;
			});	

			return totalItems;
		}
	};                                  
}]);