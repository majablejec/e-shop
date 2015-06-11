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
		template: '<h2>Submitted a new POST request for an order</h2><p>Check the network tab of your developer tools.{{ email }}</p>',
		controller: function ($scope, OrderFactory)
		{
			var newOrder = new OrderFactory({firstName: firstName, email: email, });
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

