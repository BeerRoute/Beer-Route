angular.module('your_app_name.auth.controllers', [])

.controller('LoginCtrl', function($scope, $state, $ionicLoading, $timeout, $http, $ionicPopup, $rootScope) {
	$scope.user = {};
	$scope.business = {};

	$scope.user.email = "";
	$scope.user.password = "";
	// $scope.user.password = "12345";

	$scope.doLogIn = function(){
		console.log("doing log in");

		$ionicLoading.show({
      		template: 'Loging in...'
    		});

		$timeout(function(){
			var xhr = new XMLHttpRequest({mozSystem: true});
			$http.get("http://localhost:3412/ClassDemo3Srv/login",{params: {email: $scope.user.email, password: $scope.user.password}},xhr).success(function(data){
			var r = data;
			console.log(r);
			//$ionicPopup.alert(
			//{title: JSON.stringify(r),
			//template: r.Exists});

			// Simulate login OK
			// $state.go('main.app.feed.fashion');
      			// $ionicLoading.hide();
			if(r.Exists){
			$rootScope.username = r.username;
			$rootScope.password = r.password;
			$rootScope.email = r.email;
			$rootScope.region = r.region;
			$rootScope.picture = r.picture;
			$rootScope.owner = r.isbusinessowner;
			$state.go('main.app.account');}

			else{
			$ionicPopup.alert(
			{title: 'Login failed',			
			template: 'email or password incorrect'});
			$scope.user.email = "";
			$scope.user.password = "";
			}
			})
			.error(function(data,status){
			$ionicPopup.alert(
			{title: 'Login failed',
			template: 'Could not connect to server. Please try again'});
			});
      		

      			$ionicLoading.hide();

			// Simulate login ERROR
			//$scope.error = "This is an error message";
			//$ionicLoading.hide();
		}, 800);
	};

	$scope.doFacebookLogIn = function(){
		console.log("doing FACEBOOK log in");

		$ionicLoading.show({
      template: 'Loging in...'
    });

		$timeout(function(){
			// Simulate login OK
			$state.go('main.app.account.profile');
      $ionicLoading.hide();

			// Simulate login ERROR
			// $scope.error = "This is an error message";
			// $ionicLoading.hide();
		}, 800);
	};
})

.controller('SignupCtrl', function($scope, $state, $ionicLoading, $timeout, $ionicModal, $http, $ionicPopup,$rootScope) {
	$scope.user = {};

	$scope.user.name = "";
	$scope.user.email = "";
	$scope.user.password = "";
	$scope.user.type="";
	var fun = this;

	var newPopup;
	this.completeReg = function(){
		newPopup = $ionicPopup.show({
			cssClass: 'popup-outer food-review-view',
			templateUrl: 'views/auth/completeReg.html',
			controller: 'SignupCtrl',
			//scope: angular.extend($scope, {})
			title: 'Registration',
			scope: $scope,
			buttons: [
				{ text: 'Close', type: 'close-popup'}
			]
		})
		
	}

	$scope.Closecomplete = function(){
		newPopup.close();
		$state.go('intro.walkthrough-welcome');
	}


	$scope.doSignUp = function(){
		console.log("doing sign up");

		$ionicLoading.show({
      		template: 'Creating account...'
    		});


		$timeout(function(){
			
		var xhr = new XMLHttpRequest({mozSystem: true});
		$http.get("http://localhost:3412/ClassDemo3Srv/signup",{params: {username: $scope.user.name, email: $scope.user.email, password: $scope.user.password}},xhr).success(function(data){
		console.log("Query success");	
		console.log("Is Business Owner:"+$scope.user.type);	
		var r = data;
		$ionicPopup.alert(
		{title: JSON.stringify(r),
		template: r.Exists});
		if(!r.Exists){
		$http.get("http://localhost:3412/ClassDemo3Srv/addUser",{params: {username: $scope.user.name, email: $scope.user.email, password: $scope.user.password, isbusinessowner: $scope.user.type}},xhr).success(function(data){
		$rootScope.username = $scope.user.name;
		$rootScope.password = $scope.user.password;
		$rootScope.email = $scope.user.email;
		$rootScope.isbusinessowner = $scope.user.type;
		$rootScope.owner=$scope.user.type;
		console.log("Is business owner"+$scope.user.type);
		console.log("Is business owner"+$rootScope.isbusinessowner);

		if($scope.user.type === "true"){
			$state.go('intro.business-info');
			console.log("To business View");
		}
		else{
			//$state.go('main.app.account.profile');
			fun.completeReg();
			console.log("To regular user View");
			console.log("Is business owner"+$scope.user.type);
			
		}




												});
		}
		else{
		$ionicPopup.alert(
		{title: 'Account creation failed',			
		template: 'Username or email already exists'});
		$scope.user.name = "";
		$scope.user.email = "";
		$scope.user.password = "";}
		})
		.error(function(data,status){
		$ionicPopup.alert(
		{title: 'Signup failed',
		template: 'Could not connect to server. Please try again'});
		});

		$ionicLoading.hide();




		// Simulate login OK
		// $state.go('main.app.feed.fashion');
      		// $ionicLoading.hide();

		// Simulate login ERROR
		//$scope.error = "This is an error message";
		//$ionicLoading.hide();
		}, 800);

		
	};
	//END doSignup()




	$scope.doFacebookSignUp = function(){
		console.log("doing FACEBOOK sign up");

		$ionicLoading.show({
      template: 'Creating account...'
    });

		$timeout(function(){
			
			
			// Simulate login OK
			$state.go('main.app.account');
      $ionicLoading.hide();

			// Simulate login ERROR
			// $scope.error = "This is an error message";
			// $ionicLoading.hide();
		}, 800);
	};

	$ionicModal.fromTemplateUrl('views/legal/privacy-policy.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.privacy_policy_modal = modal;
  });

	$ionicModal.fromTemplateUrl('views/legal/terms-of-service.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.terms_of_service_modal = modal;
  });

	$scope.showTerms = function(){
		$scope.terms_of_service_modal.show();
	};

	$scope.showPrivacyPolicy = function(){
		$scope.privacy_policy_modal.show();
	};
})

//********************************************
.controller('BusinessInfoCtrl', function($scope, $state, $ionicLoading, $timeout, $ionicModal, $http, $ionicPopup,$rootScope) {
	$scope.bus = {};
	//quitar la comillas y sustituirlo por los parametros de la funcion
	$scope.bus.businessname = "";
	$scope.bus.address = "";
	$scope.bus.region = "";
	$scope.bus.description = "";
	$scope.bus.path = "";

	$scope.bus.username = $rootScope.username;
	$scope.bus.creditcard = "";
	$scope.bus.ccexp = "";
	$scope.bus.businessid = ""; //Este ahi que hacer otro query para sacarlo de la tabla business
								//antes de hacer insert a este bloque de info a la tabla businessowner
	var newPopup;
	$scope.completeReg = function(){
		newPopup = $ionicPopup.show({
			cssClass: 'popup-outer food-review-view',
			templateUrl: 'views/auth/completeReg.html',
			controller: 'BusinessInfoCtrl',
			//scope: angular.extend($scope, {})
			title: 'Registration',
			scope: $scope,
			buttons: [
				{ text: 'Close', type: 'close-popup'}
			]
		})
		//$state.go('intro.walkthrough-welcome');
	}

	$scope.Closecomplete = function(){
		newPopup.close();
		$state.go('intro.walkthrough-welcome');
	}
	

	$scope.busInfo = function(){
		console.log("getting business info from user");

		//$ionicLoading.show({
      	//	template: 'Creating account...'
    	//	});		
			
		var xhr = new XMLHttpRequest({mozSystem: true});

		$http.get("http://localhost:3412/ClassDemo3Srv/businessInfo",{params: {businessname: $scope.bus.businessname, address: $scope.bus.address, region:$scope.bus.region, description:$scope.bus.description}},xhr).success(function(data){
	    var r = data;
	    $ionicPopup.alert(
	    {title: JSON.stringify('success'),
	    template: r.Message});
	    //console.log(r[0]);
	    //console.log(r[1]);
	    
	    $rootScope.business.businessname=$scope.bus.businessname;
		$rootScope.business.address	=	 $scope.bus.address;
		$rootScope.business.region=		 $scope.bus.region;
		$rootScope.business.description= $scope.bus.description;
		$rootScope.business.path = 		 $scope.bus.path;//????
		$rootScope.creditcard=	 		$scope.bus.creditcard;
		$rootScope.ccexp=		 		$scope.bus.ccexp;
		$rootScope.businessid=	 $scope.bus.businessid;//????
	    })
	    .error(function(data,status){
	    var d = data;
	    var s = status;
	    console.log('Error');
	    $ionicPopup.alert(
	    {title: JSON.stringify(d),
	    template: JSON.stringify('Error')});
	    });

	    //FALTA UN QUERY para businessid!!!!!!!! 


	    $http.get("http://localhost:3412/ClassDemo3Srv/businessownerInfo",{params: {username:$scope.bus.username, creditcard:$scope.bus.creditcard, ccexp:$scope.bus.ccexp, businessid: $scope.bus.businessid}},xhr).success(function(data2){
	    var r = data2;
	    $ionicPopup.alert(
	    {title: JSON.stringify('success'),
	    template: r.Message});
	    //console.log(r[0]);
	    //console.log(r[1]);
	    })
	    .error(function(data2,status2){
	    var d2 = data2;
	    var s2 = status2;
	    console.log('Error');
	    $ionicPopup.alert(
	    {title: JSON.stringify(d2),
	    template: JSON.stringify('Error')});
	    });		

	    $scope.completeReg();
		//$state.go('main.app.feed.deals');
	};
	
	
})

//********************************************



.controller('ForgotPasswordCtrl', function($scope, $state, $ionicLoading, $timeout) {
	$scope.user = {};

	$scope.user.email = "";

	$scope.recoverPassword = function(){
		console.log("recover password");

		$ionicLoading.show({
      template: 'Recovering password...'
    });

		$timeout(function(){
			// Simulate login OK
			$state.go('main.app.feed.fashion');
      $ionicLoading.hide();

			// Simulate login ERROR
			// $scope.error = "This is an error message";
			// $ionicLoading.hide();
		}, 800);
	};
});
