angular.module('your_app_name.auth.controllers', [])

.controller('LoginCtrl', function($scope, $state, $ionicLoading, $timeout, $http, $ionicPopup, $rootScope) {
	$scope.user = {};
	$scope.business = {};

	$scope.user.email = "";
	$scope.user.password = "";

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
			if(r.Exists){
			$rootScope.username = r.username;
			$rootScope.password = r.password;
			console.log(r.password)
			$rootScope.email = r.email;
			$rootScope.region = r.region;
			$rootScope.picture = r.picture;
			$rootScope.owner = r.isbusinessowner;
			console.log(r.businessid);
			console.log(r.isbusinessowner);
				if($rootScope.owner==true){
					$rootScope.businessid=r.businessid;
					console.log($rootScope.businessid);
					$rootScope.creditcard=r.creditcard;
					console.log($rootScope.creditcard);
					$rootScope.ccexp=r.ccexp;
					console.log($rootScope.ccexp);
					$rootScope.address=r.address;
					console.log($rootScope.address);
					$rootScope.busDescription=r.description;
					console.log($rootScope.busDescription);
					$rootScope.ownerid=r.ownerid;
					console.log($rootScope.ownerid);
				}

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
	

	$scope.busInfo = function(){
		console.log("getting business info from user");

			
		var xhr = new XMLHttpRequest({mozSystem: true});

		$http.get("http://localhost:3412/ClassDemo3Srv/businessInfo",{params: {businessname: $scope.bus.businessname, address: $scope.bus.address, region:$scope.bus.region, description:$scope.bus.description}},xhr).success(function(data){
	    var r = data;
	    $rootScope.businessname = $scope.bus.businessname;
	    console.log("Business Name arriba: "+ $rootScope.businessname);
	    console.log("Business Name arriba bus: "+ $scope.bus.businessname);
		$rootScope.address		= $scope.bus.address;
		$rootScope.region		= $scope.bus.region;
		$rootScope.description  = $scope.bus.description;
		$rootScope.path 		= $scope.bus.path;//????
		$rootScope.creditcard   = $scope.bus.creditcard;
		$rootScope.ccexp		= $scope.bus.ccexp;

		  $scope.businessID();
	    })
	    .error(function(data,status){
	    var d = data;
	    var s = status;
	    console.log('Error');
	    $ionicPopup.alert(
	    {title: "Error",
	    template: "Could not connect to server. Please try again later."});
	    });

	  

	};

	//Get businessID
	$scope.businessID = function(){
		var xhr = new XMLHttpRequest({mozSystem: true});

		//Query Get B ID
	    console.log("Get ID query start")
	    console.log("Business Name: "+ $rootScope.businessname);
	    $http.get("http://localhost:3412/ClassDemo3Srv/getbusinessID",{params: {businessname: $rootScope.businessname}},xhr).success(function(data3){
	    var bID = data3;
	    console.log(bID);
	    $rootScope.businessid=bID[0].businessid;
	    
	    console.log("Assigned business ID correctly? >>>>"+ $rootScope.businessid);

	    
	    $scope.toOwner();
	    })
	    .error(function(data3,status3){
	    var d3 = data3;
	    var s3 = status3;
	    console.log('Error');
	    $ionicPopup.alert(
	    {title: 'Error',
	    template: 'Could not connect to the server. Please try again.'});
	    });	
	    console.log("End ID query");
	}


	//Insert to businessowner
	$scope.toOwner = function(){
		var xhr = new XMLHttpRequest({mozSystem: true});

		console.log($rootScope.businessid);
		console.log($rootScope.businessname);
	    console.log("Second Query Should Start");
	    $http.get("http://localhost:3412/ClassDemo3Srv/businessownerInfo",{params: {username:$rootScope.username, creditcard:$rootScope.creditcard, ccexp:$rootScope.ccexp, businessid: $rootScope.businessid}},xhr).success(function(data2){
	    var r = data2;


	    })
	    .error(function(data2,status2){
	    var d2 = data2;
	    var s2 = status2;
	    console.log('Error');
	    $ionicPopup.alert(
	    {title: 'Error',
	    template: 'Could not connect to server. Please try again later.'});
	    });		
	     console.log("Second Query Should End");

	    $scope.completeReg();

	}
	
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


		}, 800);
	};
});
