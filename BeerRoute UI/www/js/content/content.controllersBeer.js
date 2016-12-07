angular.module('your_app_name.content.controllersBeer', [])

.controller('FashionContentCtrlBeer', function($scope, $state, $rootScope, $ionicPopup, product) {
	$scope.goBack = function() {
		var previous_view = _.last($rootScope.previousView);
		console.log(previous_view);
		$state.go(previous_view.fromState, previous_view.fromParams );
  };

	$scope.product = product;

  $scope.addToCart = function(product) {
		$ionicLoading.show({
			template: 'Adding to cart',
			duration: 1000
		});

		product.qty = 1;
		product.size = "M";
		product.color = "black";
  	ShoppingCartService.addProduct(product);
  };

	var colorPopup = {},
			sizePopup = {};

	$scope.chosen_color = 'Navy';
	$scope.chosen_size = 'M';

	$scope.openColorChooser = function(){
		colorPopup = $ionicPopup.show({
			cssClass: 'popup-outer color-chooser-view',
			templateUrl: 'views/content/fashion/color-chooser.html',
			scope: angular.extend($scope, {chosen_color: $scope.chosen_color}),
			title: 'Color',
			buttons: [
				{ text: 'Close', type: 'close-popup' }
			]
		});
	};

	$scope.openSizeChooser = function(){
		sizePopup = $ionicPopup.show({
			cssClass: 'popup-outer size-chooser-view',
			templateUrl: 'views/content/fashion/size-chooser.html',
			scope: angular.extend($scope, {chosen_size: $scope.chosen_size}),
			title: 'Size',
			buttons: [
				{ text: 'Close', type: 'close-popup' }
			]
		});
	};
})

.controller('FoodContentCtrlBeer', function($scope, $state, $rootScope, $ionicPopup, product) {
	$scope.goBack = function() {
		var previous_view = _.last($rootScope.previousView);
		console.log(previous_view);

		$state.go(previous_view.fromState, previous_view.fromParams );
	};

	$scope.product = product;

	$scope.product.selected_schedule = {
		name: "Today 12:00 pm to 12:00 am"
	};

	$scope.product.dishes = [
		{
			name:"Sanduche pull pork",
			rating: 4
		},
		{
			name:"Bahmin",
			rating: 2
		}
	];

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
				{ text: 'Close', type: 'close-popup' }
			]
		});
	};


	var newBeerReviewPopup;
	$scope.newBeeerReview = function(){
		newBeerReviewPopup = $ionicPopup.show({
			cssClass: 'popup-outer food-review-view',
			templateUrl: 'views/content/food/review.html',
			controller: 'FoodContentCtrlBeer',
			//scope: angular.extend($scope, {})
			title: 'Review',
			scope: $scope,
			buttons: [
				{ text: 'Close', type: 'close-popup' }
			]			
		});
	};

	$scope.SaveReview = function(){
		console.log('INSIDE Save Beer Review Function!!');
		console.log($rootScope.username);
		var xhr = new XMLHttpRequest({mozSystem: true});

		var comments = document.getElementById("myTextArea").value;		
		console.log(comments);		

		var starValue = 0;
    	var checkStars = document.getElementsByName("star");
    	var size = checkStars.length;
    	
    	for (i=0; i < size; i++) {
            if (checkStars[i].checked == true) {            	 
            	starValue = checkStars[i].value;
            	break;            
        	}
    	}
    	console.log('Rating Value: ' + starValue);

		

		$http.get("http://localhost:3412/ClassDemo3Srv/addBeerReview",{params: {id: product.beerid, rating: starValue, comment: comments, rdate: '2015-12-12', username: $rootScope.username}},xhr).success(function(data){
		var r = data;
		$ionicPopup.alert(
		{title: JSON.stringify('success'),
		template: r.Message});
		//console.log(r[0]);
		//console.log(r[1]);
		})
		.error(function(data,status){
		var d = data;
		var s = status;
		console.log('Error');
		$ionicPopup.alert(
		{title: JSON.stringify(d),
		template: JSON.stringify('Error')});
		});
		newReviewPopup.close();
	};

	$scope.$on('mapInitialized', function(event, map) {
		// If we want to access the map in the future
		$scope.map = map;
	});
})

.controller('TravelContentCtrlBeer', function($scope, $state, $rootScope, product) {
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

