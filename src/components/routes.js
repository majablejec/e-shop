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