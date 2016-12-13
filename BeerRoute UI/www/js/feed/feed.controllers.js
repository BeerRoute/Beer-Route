angular.module('your_app_name.feed.controllers', [])

.controller('FeedCtrl', function($scope,  $ionicScrollDelegate, ShoppingCartService) {
	$scope.getProductsInCart = function(){
		return ShoppingCartService.getProducts().length;
	};
})


.controller('TravelCtrl', function($scope, products) {
	$scope.products = products;
})

.controller('DealsCtrl', function($scope, products) {
	$scope.products = products;
})

.controller('RealStateCtrl', function($scope, products) {
	$scope.products = products;
})

;
