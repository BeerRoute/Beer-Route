angular.module('your_app_name.checkout.services', [])

.service('CheckoutService', function ($http, $q,$rootScope){

  this.getUserCreditCards = function(){
    var dfd = $q.defer();
    $http.get('logged_user_db.json').success(function(database) {
      dfd.resolve(database.user.credit_cards);
    });
    return dfd.promise;
  };

  this.getUserShippingAddresses = function(){
    var dfd = $q.defer();
    $http.get('logged_user_db.json').success(function(database) {
      dfd.resolve(database.user.shipping_addresses);
    });
    return dfd.promise;
  };

  this.saveUserSelectedCard = function(card){
    window.localStorage.your_app_name_selected_card = JSON.stringify($rootScope.creditcard);
  }
  this.saveUserSelectedAddress = function(){
    window.localStorage.your_app_name_selected_address = JSON.stringify($rootScope.address);
  }
  this.getUserSelectedCard = function(){
    return JSON.parse(window.localStorage.your_app_name_selected_card || '[]');
  };
  this.getUserSelectedAddress = function(){
    return JSON.parse(window.localStorage.your_app_name_selected_address || '[]');
  };
})

;
