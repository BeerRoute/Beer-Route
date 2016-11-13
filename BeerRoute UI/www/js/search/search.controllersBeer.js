angular.module('your_app_name.search.controllersBeer', [])

.controller('SearchCtrlBeer', function($scope, FashionService, results) {

	$scope.search = { query : '' };
	$scope.products = results;

	$scope.cancelSearch = function(){
		$scope.search = { query : '' };
	};
})


;
