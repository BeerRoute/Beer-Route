angular.module('your_app_name.content.controllers', [])

.controller('FashionContentCtrl', function($scope, $state, $rootScope, $ionicPopup, product) {
	$scope.goBack = function() {
		var previous_view = _.last($rootScope.previousView);
		//console.log(previous_view);

		$state.go(previous_view.fromState, previous_view.fromParams,{reload:true});
	};

	$scope.product = product;

	$scope.product.addresses = [
		{
			street: "0 Waubesa Junction",
			city: "Houston",
			state: "TX",
			postal_code: "77020",
			phone: "1-(713)471-0205",
			lat: 43.07493,
			lng: -89.381388
		},
		{
			street: "50 Northfield Way",
			city: "Brooklyn",
			state: "NY",
			postal_code: "11210",
			phone: "1-(347)846-3569",
			lat: 43.07493,
			lng: -88.381388
		}
	];

	$scope.product.selected_address = product.addresses[0];

	$scope.selectAddress = function(address){
		$scope.product.selected_address = address;
		addressPopup.close();
	};

	var schedulesPopup = {},
			addressPopup = {};

	$scope.openAddresses = function(){
		addressPopup = $ionicPopup.show({
			cssClass: 'popup-outer food-addresses-view',
			templateUrl: 'views/content/food/addresses.html',
			scope: angular.extend($scope, {addresses: $scope.product.addresses, selected_address: $scope.product.selected_address}),
			title: 'Addresses',
			buttons: [
				{ text: 'Close', type: 'close-popup' }
			]
		});
	};

	$scope.newReview = function(){
		newReviewPopup = $ionicPopup.show({
			cssClass: 'popup-outer food-review-view',
			templateUrl: 'views/content/food/review.html',
			//scope: angular.extend($scope, {})
			title: 'Review',
			scope: $scope,
			buttons: [
				{ text: 'Close', type: 'close-popup' }
			]			
		});
	};

	$scope.SaveReview = function(){
		newReviewPopup.close();
	};

	$scope.$on('mapInitialized', function(event, map) {
		// If we want to access the map in the future
		$scope.map = map;
	});
})

.controller('FoodContentCtrl', function($scope, $state, $rootScope, $ionicPopup, product) {
	$scope.goBack = function() {
		var previous_view = _.last($rootScope.previousView);
		console.log(previous_view);

		$state.go(previous_view.fromState, previous_view.fromParams );
	};

	$scope.product = product;

	/*var jsonBarInfo = require("./home/prel/Desktop/Beer-Route/BeerRoute UI/www/food_db.json");*/

	$scope.product.selected_schedule = {
		name: "Thursday to Sunday 4:00 pm to 12:00 am"
		

	};

	$scope.product.dishes = [
		{
			name:"La Nina",
			rating: 4
		},
		{
			name:"Two Hearted",
			rating: 4.5
		}
	];

	$scope.product.addresses = [
		{
			street: "PR-115, 00602",
			city: "Aguada",
			state: "PR",
			postal_code: "00602",
			phone: "1-(713)471-0205",
			lat: 18.380330,
			lng: -67.217394
		},
		/*{
			street: "50 Northfield Way",
			city: "Brooklyn",
			state: "NY",
			postal_code: "11210",
			phone: "1-(347)846-3569",
			lat: 43.07493,
			lng: -88.381388
		}*/
	];

	$scope.product.selected_address = product.addresses[0];

	$scope.selectAddress = function(address){
		$scope.product.selected_address = address;
		addressPopup.close();
	};

	var schedulesPopup = {},
			addressPopup = {};

	$scope.openSchedules = function(){
		schedulesPopup = $ionicPopup.show({
			cssClass: 'popup-outer food-schedules-view',
			templateUrl: 'views/content/food/schedules.html',
			scope: angular.extend($scope, {}),
			title: 'More info',
			buttons: [
				{ text: 'Close', type: 'close-popup' }
			]
		});
	};

	$scope.openAddresses = function(){
		addressPopup = $ionicPopup.show({
			cssClass: 'popup-outer food-addresses-view',
			templateUrl: 'views/content/food/addresses.html',
			scope: angular.extend($scope, {addresses: $scope.product.addresses, selected_address: $scope.product.selected_address}),
			title: 'Addresses',
			buttons: [
				{ text: 'Close', type: 'close-popup',
				}
			]
		});
	};
	var newReviewPopup;
	$scope.newReview = function(){
		newReviewPopup = $ionicPopup.show({
			cssClass: 'popup-outer food-review-view',
			templateUrl: 'views/content/food/review.html',
			controller: 'FoodContentCtrl',
			//scope: angular.extend($scope, {})
			title: 'Review',
			scope: $scope,
			buttons: [
				{ text: 'Close', type: 'close-popup' }
			]			
		});
	};

	$scope.SaveReview = function(){
		newReviewPopup.close();
	};

	$scope.$on('mapInitialized', function(event, map) {
		// If we want to access the map in the future
		$scope.map = map;
	});
})

.controller('TravelContentCtrl', function($scope, $state, $rootScope, product) {
	$scope.goBack = function() {
		var previous_view = _.last($rootScope.previousView);
		$state.go(previous_view.fromState, previous_view.fromParams );
  };

	$scope.product = product;
})
/*
.controller('DealsContentCtrl', function($scope, $state, $rootScope, product) {
	$scope.goBack = function() {
		var previous_view = _.last($rootScope.previousView);
		$state.go(previous_view.fromState, previous_view.fromParams );
	};

	$scope.product = product;
})

.controller('RealStateContentCtrl', function($scope, $state, $rootScope, product) {
	$scope.goBack = function() {
		var previous_view = _.last($rootScope.previousView);
		$state.go(previous_view.fromState, previous_view.fromParams );
	};

	$scope.product = product;
})
*/



;
