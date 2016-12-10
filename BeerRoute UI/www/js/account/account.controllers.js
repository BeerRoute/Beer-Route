angular.module('your_app_name.account.controllers', [])

.controller('ProfileCtrl', function($scope, user, $ionicPopover, $ionicPopup, $ionicActionSheet, $state, $http, $rootScope) {
  //$scope.user = user;
  $scope.user = {};
  console.log(user[0]);
  //$scope.user_credit_cards = user.credit_cards;
  //$scope.user_shipping_addresses = user.shipping_addresses;
  $scope.data = {};
  //$scope.data.selected_card = user.credit_cards[0];
  //$scope.data.selected_address = user.shipping_addresses[0];

  //console.log("Printing Redit card number: " + user.creditcard);

  //$scope.data.selected_card = user[0].creditcard; 
  $scope.data.selected_card = user[0].creditcard;

  $scope.data.card_exp = user[0].ccexp;
  $scope.data.businessid = user[0].businessid;  
  $scope.user_bar = $rootScope.owner;

  console.log($scope.data.selected_card);
  console.log($scope.data.card_exp);
  console.log($scope.data.businessid );

  $scope.user.name = $rootScope.username;
  $scope.user.password = $rootScope.password;
  $scope.user.email = $rootScope.email;
  $scope.user.region = $rootScope.region;
  $scope.user.picture = $rootScope.picture;
  $scope.show_new_address_button = false;
  $scope.show_new_card_button = false;
  $scope.notifications = {};
  $scope.notifications.promotions = false;
  $scope.notifications.shipment_updates = true;
  $scope.ownerid = user[0].ownerid;
  
  
  $scope.test = function(){
var xhr = new XMLHttpRequest({mozSystem: true});

$http.get("http://localhost:3412/ClassDemo3Srv/ok",{params: {sname: '', password:'********'}},xhr).success(function(data){
var r = data;
$ionicPopup.alert(
{title: JSON.stringify(r),
template: r.Message});
//console.log(r[0]);
//console.log(r[1]);
})
.error(function(data,status){
var d = data;
var s = status;
$ionicPopup.alert(
{title: JSON.stringify(d),
template: JSON.stringify(s)});
});
}

  $ionicPopover.fromTemplateUrl('views/checkout/partials/address-chooser-popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.addresses_popover = popover;
  });

  $ionicPopover.fromTemplateUrl('views/checkout/partials/card-chooser-popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.cards_popover = popover;
  });

  $scope.isBarOwner = function(){
    return ($scope.user_bar == true);
  }

  $scope.openAddressesPopover = function($event){
		$scope.addresses_popover.show($event);
	};
  $scope.selectShippingAddress = function(address){
		$scope.addresses_popover.hide();
	};

  $scope.openCardsPopover = function($event){
		$scope.cards_popover.show($event);
	};
  $scope.selectCreditCard = function(card){
		$scope.cards_popover.hide();
	};

  $scope.logout = function(){
    $ionicActionSheet.show({
      titleText: 'Are you sure you want to logout?',
      destructiveText: 'Logout',
      cancelText: 'Cancel',
      cancel: function() {
        return true;
      },
      destructiveButtonClicked: function() {
        $state.go('intro.auth-login');
      }
    });
  };

  $scope.showEditCardPopup = function(card) {
		$scope.card = card;

    var editCardPopup = $ionicPopup.show({
      cssClass: 'popup-outer edit-card-view',
      templateUrl: 'views/checkout/partials/edit-card-popup.html',
      title: '**** ' + card.number.slice(-4),
      scope: $scope,
      buttons: [
        { text: 'Close' },
				{
          text: 'Delete',
					// type: 'icon-left ion-trash-a delete-button',
					type: 'delete-button',
          onTap: function(e) {
            // return $scope.data;
          }
        },
        {
          text: 'Edit',
          onTap: function(e) {
            // return $scope.data;
          }
        }
      ]
    });
    editCardPopup.then(function(res) {
      if(res)
      {
				console.log('hacer algo cuando apreta ADD con los datos llenos')
      }
      else {}
    });
  };

  var newPostPopup;
  $scope.newPost = function(){
    newPostPopup = $ionicPopup.show({
      cssClass: 'popup-outer food-review-view',
      templateUrl: 'views/account/post.html',
      controller: 'ProfileCtrl',
      //scope: angular.extend($scope, {})
      title: 'Post',
      scope: $scope,
      buttons: [
        { text: 'Close', type: 'close-popup' }
      ]     
    });
  };

  $scope.SavePost = function(){
    console.log('INSIDE new Post Function!!');
    //console.log($rootScope.username);
    var xhr = new XMLHttpRequest({mozSystem: true});

    var comments = document.getElementById("myTextArea").value;   
    //console.log(comments);    
    console.log(user);
    

    $http.get("http://localhost:3412/ClassDemo3Srv/addFeedPost",{params: {description: comments, businessid: $scope.data.businessid }},xhr).success(function(data){
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
    


    newPostPopup.close();
  };

  $scope.showConfirm = function() {
  	var xhr = new XMLHttpRequest({mozSystem: true});
   var confirmPopup = $ionicPopup.confirm({
     title: 'Pay Membership fee',
     template: 'Are you sure you want to pay the $15.00 membership fee with your current credit card?'
   });

   confirmPopup.then(function(res) {
     if(res) {
       $http.get("http://localhost:3412/ClassDemo3Srv/makePayment",{params: {ownerid: $scope.ownerid, creditcard: $scope.data.selected_card, email: $scope.user.email }},xhr).success(function(data){
       $ionicPopup.alert(
       {title: 'Transaction is a success',
       template: 'Thank you for using Beer Route'});
       })
    .error(function(data,status){
    var d = data;
    var s = status;
    console.log('Error');
    $ionicPopup.alert(
    {title: JSON.stringify(d),
    template: JSON.stringify('Error')});

});
     } else {
       console.log('You are not sure');
     }
   });
 };

  $scope.showEditAddressPopup = function(address) {
		$scope.address = address;

    var editAddressPopup = $ionicPopup.show({
      cssClass: 'popup-outer edit-shipping-address-view',
      templateUrl: 'views/checkout/partials/edit-shipping-address-popup.html',
      title: address.street,
      scope: $scope,
      buttons: [
        { text: 'Close' },
        {
          text: 'Delete',
					// type: 'icon-left ion-trash-a delete-button',
					type: 'delete-button',
          onTap: function(e) {
            // return $scope.data;
          }
        },
        {
          text: 'Edit',
          onTap: function(e) {
            // return $scope.data;
          }
        }
      ]
    });
    editAddressPopup.then(function(res) {
      if(res)
      {
				console.log('hacer algo cuando apreta ADD con los datos llenos')
      }
      else {}
    });
  };
})

.controller('OrdersCtrl', function($scope, orders, OrderService) {
	$scope.orders = orders;
});