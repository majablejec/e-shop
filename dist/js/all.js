//  Add ui-router as a dependency
angular.module('app', ['ui.router', 'ngResource', 'ui.bootstrap']);

angular.module('app').controller('MainCtrl', ['$scope', '$stateParams', 'CategoryFactory', 'ProductFactory', 'CartFactory', function($scope, $stateParams, CategoryFactory, ProductFactory, CartFactory) {
  
	//$scope.categories = CategoryFactory.query();
	$scope.categories = CategoryFactory.query({id: $stateParams.id});
	
	$scope.products = ProductFactory.query();
	
	$scope.cartAdd = function(id){
		CartFactory.cartAdd(id);
	};
	
	$scope.cartRemove = function(productId){
		CartFactory.cartRemove(productId);
	};
	
	$scope.total = function(){
		return CartFactory.calculateTotal();
	};
	
	$scope.totalItems = function(){
		return CartFactory.calculateItems();
	};
	
	$scope.cart = CartFactory.getCart();
	
	$scope.interval = 3000;
	
	$scope.order = function() {
		$scope.validation = true;
		alert($scope.cart);
	};
	
	/*$scope.indexOf = function(list, id){
		IndexFactory.indexOf(list, id);
	};*/
	
	indexOf = function(list, id) {
		for (var i = 0; i < list.length; i++) {
			if (list[i].id === id) { 
				return i; 
			}
		}
		return -1;
	};
	
	getCategory = function(categoryId) {
		console.log(categoryId);
		return 'abc';
		/*categories.forEach(function(item){
			console.log(item);
			if (item.id === categoryId){
				console.log(item.category);
				return item.category;
			} 
		});*/
		
	};
	
}]);

angular.module('app').config(function ($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise('/error');
		 
	$stateProvider.state('home',
	{
		url: '/',
		templateUrl: 'templates/homepage.html'
	});

	/*$stateProvider.state('category',
	{
		url: '/category',
		templateUrl: 'templates/category-new.html',
		//controller:  function ($scope, CategoryFactory)
		//{
			//$scope.categories = CategoryFactory.query({});
		//}
		controller: 'MainCtrl'
	});*/
							  
	$stateProvider.state('categories',
	{
		url: '/categories/:id',
		templateUrl: 'templates/category.html',
		/*controller: function ($scope, CategoryFactory, $stateParams)
		{
			$scope.category = CategoryFactory.query({id: $stateParams.id});
		}*/
		//controller: 'CategoryCtrl'
		controller: 'MainCtrl'
	});

	$stateProvider.state('products',
	{
		url: '/products',
		templateUrl: 'templates/products.html',
		/*controller: function ($scope, ProductFactory)
		{
			//$scope.products = ProductFactory.query({onlyStocked: true});
			$scope.products = ProductFactory.query();
		}*/
		controller: 'MainCtrl'
	});

	$stateProvider.state('detail',
	{
		url: '/products/:id',
		templateUrl: 'templates/productDetail.html',
		controller: function ($scope, ProductFactory, $stateParams)
		{
			$scope.product = ProductFactory.get({id: $stateParams.id});
		}
	});

	$stateProvider.state('orders',
	{
		url: '/orders',
		template: '<h2>Submitted a new POST request for an order</h2><p>Check the network tab of your developer tools.</p>',
		controller: function ($scope, OrderFactory)
		{
			var newOrder = new OrderFactory({items: [], price: {}});
			newOrder.$save();
		}
	});
													  										  
	$stateProvider.state('error',
	{
		url: '/error',
		template: '<h2>The page you requested does not exists.</h2>'
	});
	
	$stateProvider.state('cart',
	{
		url: '/cart',
		templateUrl: 'templates/cart.html',
	});
	
	$stateProvider.state('payment',
	{
		url: '/payment',
		templateUrl: 'templates/payment.html',
	});

});


angular.module('app').controller('SliderController', function($scope){

    $scope.interval = 3000;

    $scope.slides = [{img:'http://lorempixel.com/400/200/sports', text:"Slide 1"}, {img: 'http://lorempixel.com/400/200', text:"Slide 2"}];

});
angular.module('app').directive('appCarousel', function(){
	return {
		restrict: 'E',
		//controller: 'SliderController',
		controller: 'MainCtrl',
		templateUrl: 'templates/carousel-template.html'
	};
});
angular.module('app').factory('CategoryFactory', function ($resource) {

    return $resource('http://smartninja.betoo.si/api/eshop/categories');
    
});
angular.module('app').controller('CategoryCtrl', ['$scope', 'CategoryFactory', function($scope, CategoryFactory) {
	
	$scope.categories = CategoryFactory.query({id: $stateParams.id});
	
}]);
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
angular.module('app').factory('IndexFactory', [ '$rootScope', function($rootScope){
	
	indexOf = function(list, id) {
		for (var i = 0; i < list.length; i++) {
			if (list[i].id === id) { 
				return i; 
			}
		}
		return -1;
	}; 
                        
}]);
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
                                                        input: function ()
                                                        {
                                                            //return [1, 2, 3];
															return $scope.total;
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
		template: '<a class="btn btn-info" ng-click="openModal()" role="button">Cart summary MODAL</a>'
    };
});
angular.module('app').controller('ModalInstanceController', ['CartFactory', function($scope, input, $modalInstance, CartFactory){

	//$scope.data = input;
	
	input = function(){
		return CartFactory.calculateTotal();
	};

    $scope.total = input;

    $scope.ok = function() {
        $modalInstance.close('Success');
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('Dismissed');
    };

}]);
angular.module('app').factory('CartFactory', [ '$rootScope', function($rootScope){
  
	var cart = [];
	
	cartAddNew = function(product){
		product.quantity = 1;
		cart.push(product);
	};
	
	/*
	indexOf = function(list, id) {
		for (var i = 0; i < list.length; i++) {
			if (list[i].id === id) { 
				return i; 
			}
		}
		return -1;
	}; 
	*/
  
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
angular.module('app').factory('OrderFactory', function($resource){
	
	return $resource('http://smartninja.betoo.si/api/eshop/orders');

});
angular.module('app').controller('CartCtrl', ['$scope', 'CartFactory', function($scope, CartFactory) {
	
	$scope.cartAdd = function(id){
		CartFactory.cartAdd(id);
	};
	
	$scope.total = CartFactory.calculateTotal();
	
	$scope.cart = CartFactory.getCart();
	
}]);
angular.module('app').directive('product', function(){
	return {
		templateUrl: 'templates/product.html',
	};
});
angular.module('app').factory('ProductFactory', function ($resource) {

    return $resource('http://smartninja.betoo.si/api/eshop/products/:id');

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
        return $http.get('http://smartninja.betoo.si/api/eshop/products', {params:{query : query}}).then(function(response)
                                                                                                         {
                                                                                                             return response.data;
                                                                                                         })
    };
});
angular.module('app').directive('appTypeahead', function(){
	return {
		restrict: 'E',
		controller: 'TypeController',
		templateUrl: 'templates/typeahead-template.html'
	};
});