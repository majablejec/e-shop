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
			
			// Shopping cart has at least one product in it. Therefore it makes sense to check wether a product already axists in the shopping cart
			if(cart.length !== 0){
				
				// Loop thorugh the products in the shopping cart and check if the product already exists in the shopping cart
				cart.forEach(function(item){
					if (item.id === product.id){
						// If the product already exists in the shopping cart, set match to true
						match = true
						// Check if there is enough pieces of the product in stock
						if (item.quantity < product.stock){
						// if yes, increase quantity by 1
						cart[indexOf(cart, item.id)].quantity += 1;
						// if no, alert that adding another piece of that product is not possible
						} else {
							alert("Sorry, only " + product.stock + " pieces of " + product.name + " in stock and all " + product.stock + " pieces already in your shopping cart.");
						}
					} 
				});
				
				// If the product a user would like to add does not exists in the shopping cart 
				// we simply add a new product (quantity is ok as on our page we only display products that are in stock, so at least one piece of the respective product is always avalable) 
				// to cart by calling a cartAddNew(product) function
				if(!match) {
					cartAddNew(product);
				}
				
			// Cart is empty. 
			// This means that we have nothing to comprae and we simply add a new product (quantity is ok as on our page we only display products that are in stock, so at least one piece of the respective product is always avalable) 
			// to cart by calling a cartAddNew(product) function
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