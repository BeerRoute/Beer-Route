angular.module('your_app_name.account.services', [])

.service('OrderService', function ($http, $q){

  this.getUserOrders = function(){
    var dfd = $q.defer();
    var service = this;

    $http.get('logged_user_db.json').success(function(database) {
      var orders = _.each(database.user.orders, function(order){
        service.getOrderProducts(order).then(function(products){
          order.products = products;
        }, function(error){
          console.log("ups", error);
        });
      });

      dfd.resolve(orders);
    });
    return dfd.promise;
  };

  this.getOrderProducts = function(order){
    var dfd = $q.defer();

    $http.get('fashion_db.json').success(function(database) {
      //add product data to this order
      var products = _.map(order.products, function(product){
        return _.find(database.products, function(p){ return p.id == product.id; });
      });
      dfd.resolve(products);
    });

    return dfd.promise;
  };

})



.service('ProfileService', function ($http, $q, $ionicPopup, $rootScope){
  this.getUserData = function(){
    var dfd = $q.defer();
    //$http.get('logged_user_db.json').success(function(database) {
      //dfd.resolve(database.user);


      console.log('INSIDE get Business Owner Info!!');
      //console.log($rootScope.username);
      var xhr = new XMLHttpRequest({mozSystem: true});    
    

      $http.get("http://localhost:3412/ClassDemo3Srv/getbusinessuser", {params: {username: $rootScope.username}},xhr).success(function(data){
      var r = data;
      //$ionicPopup.alert(
      //{title: JSON.stringify('success'),
      //template: r.Message});
      //console.log(r[0]);
      //console.log(r[1]);
      dfd.resolve(data);
      })
      .error(function(data,status){
      var d = data;
      var s = status;
      console.log('Error');
      $ionicPopup.alert(
      {title: JSON.stringify(d),
      template: JSON.stringify('Error')});
      });

      console.log("End Query");


    //});
    return dfd.promise;
  };
})

;
