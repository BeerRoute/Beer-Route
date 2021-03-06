angular.module('your_app_name.feed.servicesBeer', [])

.service('FashionServiceBeer', function ($http, $q){
  this.getProducts = function(){
    //var dfd = $q.defer();
    //$http.get('beer_db.json').success(function(database) {
    var xhr = new XMLHttpRequest({mozSystem: true});
    var dfd = $q.defer();
    $http.get("http://localhost:3412/ClassDemo3Srv/getbeer", {params: {username: $rootScope.username}},xhr).success(function(products){
    dfd.resolve(products);
    console.log(products);
    });
    return dfd.promise;
  };

  this.getProduct = function(productId){
    var dfd = $q.defer();
    var service = this;
    var xhr = new XMLHttpRequest({mozSystem: true});
    //$http.get('beer_db.json').success(function(database) {
      $http.get("http://localhost:3412/ClassDemo3Srv/getbeer", {params: {username: $rootScope.username}},xhr).success(function(products){
      console.log("I am here...")
      var product = _.find(database.products, function(product){
        return product.id == productId;
      });

      service.getRelatedProducts(product).then(function(related_products){
        product.related_products = related_products;
      }, function(error){
        console.log("ups", error);
      });

      dfd.resolve(product);
    });
    return dfd.promise;
  };

  this.getRelatedProducts = function(product){
    var dfd = $q.defer();

    $http.get('beer_db.json').success(function(database) {
      //add product data to this order
      var related_products = _.map(product.related_products, function(product){
        return _.find(database.products, function(p){ return p.id == product.id; });
      });
      dfd.resolve(related_products);
    });

    return dfd.promise;
  };
})

.service('FoodServiceBeer', function ($http, $q){
  this.getProducts = function(){
    var dfd = $q.defer();
    $http.get('http://localhost:3412/ClassDemo3Srv/getbusiness').success(function(database) {
      console.log("Checking bars from DB");
      console.log(database.products[1].businessname);
      console.log(database.products[1].id);
      console.log("Results logged");
      dfd.resolve(database.products);
    });
    return dfd.promise;
  };

  this.getProduct = function(productId){
    var dfd = $q.defer();
    $http.get('http://localhost:3412/ClassDemo3Srv/getbusiness').success(function(database) {
      var product = _.find(database.products, function(product){
        return product.id == productId;
      });
      dfd.resolve(product);
    });
    return dfd.promise;
  };
})
/*
.service('DealsService', function ($http, $q){
  this.getProducts = function(){
    var dfd = $q.defer();
    $http.get('http://localhost:3412/ClassDemo3Srv/getevents').success(function(database) {
      dfd.resolve(database.products);
    });
    return dfd.promise;
  };

  this.getProduct = function(productId){
    var dfd = $q.defer();
    $http.get('http://localhost:3412/ClassDemo3Srv/getevents').success(function(database) {
      var product = _.find(database.products, function(product){ return product.id == productId; });
      dfd.resolve(product);
    });
    return dfd.promise;
  };
})
*/
.service('TravelService', function ($http, $q){
  this.getProducts = function(){
    var dfd = $q.defer();
    $http.get('travel_db.json').success(function(database) {
      dfd.resolve(database.products);
    });
    return dfd.promise;
  };

  this.getProduct = function(productId){
    var dfd = $q.defer();
    $http.get('travel_db.json').success(function(database) {
      var product = _.find(database.products, function(product){
        return product.id == productId;
      });
      dfd.resolve(product);
    });
    return dfd.promise;
  };
})

.service('RealStateService', function ($http, $q){
  this.getProducts = function(){
    var dfd = $q.defer();
    $http.get('real_state_db.json').success(function(database) {
      dfd.resolve(database.products);
    });
    return dfd.promise;
  };

  this.getProduct = function(productId){
    var dfd = $q.defer();
    $http.get('real_state_db.json').success(function(database) {
      var product = _.find(database.products, function(product){
        return product.id == productId;
      });
      dfd.resolve(product);
    });
    return dfd.promise;
  };
})
;
