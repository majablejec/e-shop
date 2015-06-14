angular.module('app', ['ui.router', 'ngResource', 'ui.bootstrap', 'ngAnimate']);

/*angular.module('app').config(function(lockerProvider){
	
	//	Setting default driver and namespace
	lockerProvider.setDefaultDriver('local')
		  .setDefaultNamespace('app');
	
});
*/




/*
angular.module('app').config(['lockerProvider', function config(lockerProvider) {
    lockerProvider.defaults({
        driver: 'session',
        namespace: 'myApp',
        separator: '.',
        eventsEnabled: true,
        extend: {}
    });
}]);
*/

//ng-animate and ui-bootstrap are not compatible
//this directive sorts it out
//The question found at: http://stackoverflow.com/questions/22641834/angularjs-corousel-stops-working
//the solution found at: https://github.com/angular-ui/bootstrap/issues/1350 by simonykq commented on Feb 10, 2014

angular.module('app').directive('disableAnimation', function($animate){
    return {
        restrict: 'A',
        link: function($scope, $element, $attrs){
            $attrs.$observe('disableAnimation', function(value){
                $animate.enabled(!value, $element);
            });
        }
    }
});

angular.module('app').controller('MainCtrl', ['$scope', '$stateParams', 'CategoryFactory', 'CartFactory', function($scope, $stateParams, CategoryFactory, CartFactory) {

	// Če tega v MainCtrl ni, se modal (Cart Summary) ne odpre
	/*$scope.total = function(){
		return CartFactory.calculateTotal();
	};
	
	// Če tega v mainCtrl ni, se modal (Cart Summary) ne odpre
	$scope.totalItems = function(){
		return CartFactory.calculateItems();
	};*/
	
	// Nujno, da category.html prepozna stateParamsId
	$scope.stateParamsId = $stateParams.id;
	
	// Brez $scope.categories funkciji getCategory in getCategoryName ne delata
	//TypeError: Cannot read property 'forEach' of undefined
	
	$scope.categories = CategoryFactory.query({id: $stateParams.id});
	
	// Ne znam je prestaviti v CategoryFactoryPart2
	$scope.getCategory = function(id) {
		//console.log(id);
		var result;
		$scope.categories.forEach(function(item){
			if(item.id == id) {
				result = item;
			}
	});

	return result;

	};
	
	// Ne znam je prestaviti v CategoryFactoryPart2
	$scope.getCategoryName = function(categoryId) {
		var result;
		$scope.categories.forEach(function(item){
			if(item.id == categoryId) {
				result = item.category;
			}
		});

		return result;
	
	};
	
}]);

angular.module('app').config(function ($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise('/error');
		 
	$stateProvider.state('home',
	{
		url: '/',
		templateUrl: 'templates/homepage.html',
		controller: function ($scope, ProductFactory)
		{
			$scope.products = ProductFactory.query();
		}
	});
	
	$stateProvider.state('error',
	{
		url: '/error',
		template: '<h2>The page you requested does not exists.</h2>'
	});

	$stateProvider.state('detail',
	{
		url: '/products/:id',
		templateUrl: 'templates/productDetail.html',
		controller: function ($scope, ProductFactory, CartFactory, $stateParams, CategoryFactory)
		{
			$scope.product = ProductFactory.get({id: $stateParams.id});
			
			$scope.cartAdd = function(id){
				CartFactory.cartAdd(id);
			};
			
			$scope.cart = CartFactory.getCart();
			
			// Te funkcije mi ni uspelo prestaviti v CategoryFactoryPart2
			// Error: [$injector:unpr] Unknown provider: $scopeProvider <- $scope <- CategoryFactoryPart2
			// T U K A J
			
			/*$scope.getCategoryName = function(categoryId) {
				var result;
				$scope.categories.forEach(function(item){
					if(item.id == categoryId) {
						result = item.category;
					}
				});

				return result;
			
			};*/
			
			//$scope.getCategoryName = function(id){
				//CategoryFactoryPart2.getCategoryName(id);
			//};
		}
	});
	
	$stateProvider.state('categories',
	{
		url: '/categories/:id',
		templateUrl: 'templates/category.html',
		controller: function ($scope, $stateParams, CategoryFactory)
		{
			$scope.stateParamsId = $stateParams.id;
			
			// Te funkcije mi ni uspelo prestaviti v CategoryFactoryPart2
			// Error: [$injector:unpr] Unknown provider: $scopeProvider <- $scope <- CategoryFactoryPart2
			// T U K A J
			
			/*$scope.getCategory = function(id) {
				var result;
				$scope.categories.forEach(function(item){
					if(item.id == id) {
						result = item;
					}
			});

			return result;
	
			};*/
			
			/*
			$scope.getCategory = function(id){
				CategoryFactoryPart2.getCategory(id);
			};
			*/
		}
	});
	
	$stateProvider.state('cart',
	{
		url: '/cart',
		templateUrl: 'templates/cart.html',
	});
	
	$stateProvider.state('orders',
	{
		url: '/orders',
		templateUrl: 'templates/orders.html',
	});

});
angular.module('app').controller('SliderController', function($scope){

    $scope.interval = 3000;

});
angular.module('app').directive('appCarousel', function(){
	return {
		restrict: 'E',
		controller: 'SliderController',
		templateUrl: 'templates/carousel-template.html'
	};
});
angular.module('app').controller('CartCtrl', ['$scope', 'CartFactory', function($scope, CartFactory) {
	
	$scope.cart = CartFactory.getCart();
	
	$scope.cartRemove = function(productId){
		CartFactory.cartRemove(productId);
	};
	
	$scope.total = function(){
		return CartFactory.calculateTotal();
	};
	
	$scope.totalItems = function(){
		return CartFactory.calculateItems();
	};
	
}]);

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
angular.module('app').directive('cartEmpty', function(){
	return {
		restrict: 'E',
		//template: '<p>hello</p>',
		templateUrl: 'templates/cartEmpty.html',
	};
});
angular.module('app').controller('CategoryCtrl', ['$scope', '$stateParams', 'ProductCategoryFactory', 'CartFactory', function($scope, $stateParams, ProductCategoryFactory, CartFactory) {
	
	//$scope.categories = CategoryFactory.query({id: $stateParams.id});
	$scope.productsInCategory = ProductCategoryFactory.query({id: $stateParams.id});
	
	$scope.cartAdd = function(id){
		CartFactory.cartAdd(id);
	};
	
}]);
angular.module('app').factory('CategoryFactory', function ($resource) {

    return $resource('http://smartninja.betoo.si/api/eshop/categories');
    
});
//Tega factory mi ni uspelo narediti skupaj s Categoryfactory. Nisem vedela, kako naj poleg funkcije getCategory returnam še $resource.

angular.module('app').factory('CategoryFactoryPart2', ['$scope', function ($scope) {
	
	
	return {
		getCategoryName : function(categoryId) {
			var result;
			$scope.categories.forEach(function(item){
				if(item.id == categoryId) {
					result = item.category;
				}
			});

			return result;
		
		}
	}
	
	
	/*
	return {
		
		getCategory : function(id) {
			var result;
			$scope.categories.forEach(function(item){
				if(item.id == id) {
					result = item;
				}
		});

		return result;

		}
	};
	*/
    
}]);

angular.module('app').factory('ProductCategoryFactory', function ($resource) {

	return $resource('http://smartninja.betoo.si/api/eshop/categories/:id/products', {onlyStocked:true});
    
});
angular.module('app').directive('appDatepicker', function(){
    return {
        restrict: 'E',
        controller: 'DatesController',
        templateUrl: 'templates/datepicker-template.html'
    };
});
angular.module('app').controller('DatesController', function($scope){

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };
});
angular.module('app').directive('appExample', function(){
	return {
		restrict: 'E',
		scope:{},
		templateUrl: 'templates/example-template.html'
	};
});
/*angular.module('app').factory('IndexFactory', [ '$rootScope', function($rootScope){
	
	return {
		indexOf : function(list, id) {
			for (var i = 0; i < list.length; i++) {
				if (list[i].id === id) { 
					return i; 
				}
			}
			return -1;
		}
	};
                        
}]);*/
/*angular.module('app').factory('IndexFactory', [ '$rootScope', function($rootScope){
	
	indexOf = function(list, id) {
		for (var i = 0; i < list.length; i++) {
			if (list[i].id === id) { 
				return i; 
			}
		}
		return -1;
	}; 
                        
}]);*/
angular.module('app').directive('appModal', function ()
{
    return {
        restrict:   'E',
        controller: function ($scope, $modal)
        {
            $scope.openModal = function ()
            {
				var modalInstance = $modal.open({
                                                    templateUrl: 'templates/modal-template.html',
                                                    controller:  'ModalInstanceController',
                                                    resolve:     {
                                                        total: function ()
                                                        {
                                                            return $scope.total();
                                                        },
														totalItems: function ()
                                                        {
                                                            return $scope.totalItems();
                                                        }
                                                    }
                                                });

                modalInstance.result.then(function (success)
                                          {
                                              alert(success);
                                          }, function (error)
                                          {
                                              alert(error);
                                          });
            }
        },
		template: '<a class="btn btn-info" ng-click="openModal()" role="button">Cart summary</a>'
    };
});
angular.module('app').controller('ModalInstanceController', [
	'$scope', 
	'total', 
	'totalItems', 
	'$modalInstance', 
	'OrdersFactory', 
	'CartFactory',
	function(
		$scope, 
		total, 
		totalItems, 
		$modalInstance, 
		OrdersFactory, 
		CartFactory
	){

    $scope.total = total;
	
	$scope.totalItems = totalItems;

    $scope.ok = function() {
        $modalInstance.close("ok");
    };

    $scope.cancel = function() {
        $modalInstance.dismiss();
    };
	
}]);
angular.module('app').controller('NavCtrl', ['$scope', '$stateParams', 'CategoryFactory', 'CartFactory', function($scope, $stateParams, CategoryFactory, CartFactory) {
	
	// Izpis kategorij v glavnem meniju
	$scope.categories = CategoryFactory.query({id: $stateParams.id});
	
	// Število produktov v košarici
	$scope.totalItems = function(){
		return CartFactory.calculateItems();
	};
	
}]);

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


angular.module('app').factory('OrdersFactory', function($resource){
	
	return $resource('http://smartninja.betoo.si/api/eshop/orders');

});
angular.module('app').directive('product', function(){
	return {
		restrict: 'E',
		templateUrl: 'templates/product.html',
		controller: function ($scope, CartFactory)
		{
			$scope.cartAdd = function(id){
				CartFactory.cartAdd(id);
			};
		}
	};
});
angular.module('app').factory('ProductFactory', function ($resource) {

    return $resource('http://smartninja.betoo.si/api/eshop/products/:id');

});
angular.module('app').directive('productInCart', function(){
	return {
		restrict: 'E',
		templateUrl: 'templates/productInCart.html',
		controller: function ($scope, CartFactory)
		{
			$scope.cart = CartFactory.getCart();
			
			$scope.cartAdd = function(id){
				CartFactory.cartAdd(id);
			};
			
			// Te funkcije mi ni uspelo prestaviti v CategoryFactoryPart2
			// Error: [$injector:unpr] Unknown provider: $scopeProvider <- $scope <- CategoryFactoryPart2
			// T U K A J
			
			/*$scope.getCategoryName = function(categoryId) {
				var result;
				$scope.categories.forEach(function(item){
					if(item.id == categoryId) {
						result = item.category;
					}
				});

				return result;
			
			};*/
			
			//$scope.getCategoryName = function(id){
				//CategoryFactoryPart2.getCategoryName(id);
			//};
		}
	};
});
angular.module('app').controller('TimeController', function($scope){

    $scope.mytime = new Date();

	$scope.hstep = 1;
	$scope.mstep = 1;
	
	$scope.ismeridian = true;
	$scope.toggleMode = function() {
		$scope.ismeridian = ! $scope.ismeridian;
	};

	
});
angular.module('app').directive('appTimepicker', function(){
    return {
        //restrict: 'E',
        controller: 'TimeController',
        templateUrl: 'templates/timepicker.html'
    };
});
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

angular.module('app').directive('appTypeahead', function(){
	return {
		restrict: 'E',
		controller: 'TypeController',
		templateUrl: 'templates/typeahead-template.html'
	};
});