angular.module('your_app_name.search.controllersBeer', [])

.controller('SearchCtrlBeer', function($scope, FoodService, results) {

	$scope.search = { query : '' };
	$scope.products = results;

	$scope.cancelSearch = function(){
		$scope.search = { query : '' };
	};
})


;
