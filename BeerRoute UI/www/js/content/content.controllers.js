angular.module('your_app_name.content.controllers', [])

.controller('FashionContentCtrl', function($scope, $state, $rootScope, $ionicPopup, product, $http) {
	$scope.goBack = function() {
		var previous_view = _.last($rootScope.previousView);
		//console.log(previous_view);

		$state.go(previous_view.fromState, previous_view.fromParams,{reload:true});
	};

	$scope.wishBeer = function(beerid) {
		console.log(beerid);
		var xhr = new XMLHttpRequest({mozSystem: true});
			$http.get("http://localhost:3412/ClassDemo3Srv/wishBeer",{params: {beerid: beerid, username: $rootScope.username}},xhr).success(function(data){
			var r = data;
			console.log(r);
			})
			.error(function(data,status){
			$ionicPopup.alert(
			{title: 'Error',
			template: 'Could not connect to server. Please try again'});
			});

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

	var newBeerReviewPopup;
	$scope.newBeerReview = function(){
		newBeerReviewPopup = $ionicPopup.show({
			cssClass: 'popup-outer food-review-view',
			templateUrl: 'views/content/food/review.html',
			controller: 'FashionContentCtrl',
			title: 'Review',
			scope: $scope,
			buttons: [
				{ text: 'Close', type: 'close-popup' }
			]			
		});
	};

	$scope.SaveReview = function(){
		console.log('INSIDE Save Beer Review Function!!');
		//console.log($rootScope.username);
		var xhr = new XMLHttpRequest({mozSystem: true});

		var comments = document.getElementById("myTextArea").value;		
		//console.log(comments);		

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
    	//console.log(product);
		

		$http.get("http://localhost:3412/ClassDemo3Srv/addBeerReview",{params: {beerid: product.beerid, rating: starValue, comment: comments, rdate: '2016-12-06', username: $rootScope.username}},xhr).success(function(data){
		var r = data;

		})
		.error(function(data,status){
		var d = data;
		var s = status;
		console.log('Error');
		$ionicPopup.alert(
		{title: 'Error',
		template: 'Could not connect to server. Please try again.'});
		});
		newBeerReviewPopup.close();
	};

	$scope.$on('mapInitialized', function(event, map) {
		// If we want to access the map in the future
		$scope.map = map;
	});
	
	$scope.isBarOwner = function(){
	console.log("Calling Owner function");
	console.log('isbusinessowner: ' + JSON.stringify($rootScope.isbusinessowner));
	return $rootScope.isbusinessowner;
	
};
})

.controller('FoodContentCtrl', function($scope, $state, $rootScope, $ionicPopup, product, $http) {
	$scope.goBack = function() {
		var previous_view = _.last($rootScope.previousView);
		console.log(previous_view);

		$state.go(previous_view.fromState, previous_view.fromParams );
	};

	$scope.product = product;

	

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
			
			title: 'Review',
			scope: $scope,
			buttons: [
				{ text: 'Close', type: 'close-popup' }
			]			
		});
	};

	$scope.SaveReview = function(){
		console.log('INSIDE Save Review Function!!');
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

		

		$http.get("http://localhost:3412/ClassDemo3Srv/addReview",{params: {id: product.businessid, rating: starValue, comment: comments, rdate: '2015-12-12', username: $rootScope.username}},xhr).success(function(data){
		var r = data;
		console.log(r);
		})
		.error(function(data,status){
		var d = data;
		var s = status;
		console.log('Error');
		$ionicPopup.alert(
		{title: 'Error',
		template: 'Could not connect to server. Please try again'});
		});
		newReviewPopup.close();
	};

	$scope.$on('mapInitialized', function(event, map) {
		// If we want to access the map in the future
		$scope.map = map;
	});
	
	$scope.isBarOwner = function(){
	
	return $rootScope.isbusinessowner;
	
};
})

.controller('TravelContentCtrl', function($scope, $state, $rootScope, product) {
	$scope.goBack = function() {
		var previous_view = _.last($rootScope.previousView);
		$state.go(previous_view.fromState, previous_view.fromParams );
  };

	$scope.product = product;
})

;
