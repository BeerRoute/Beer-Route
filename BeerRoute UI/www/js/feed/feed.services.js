angular.module('your_app_name.feed.services', [])

.service('FashionService', function ($http, $q){
  this.getProducts = function(){
    var dfd = $q.defer();
     var xhr = new XMLHttpRequest({mozSystem: true});
     $http.get("http://localhost:3412/ClassDemo3Srv/getbeer",xhr)
     .success(function(products){
      console.log(products);
    //$http.get('beer_db.json').success(function(database) {
      console.log("JEJEJE");
      dfd.resolve(products);
    });
    return dfd.promise;
  };

  this.getProduct = function(productId){
    var dfd = $q.defer();
    var service = this;

    //$http.get('beer_db.json').success(function(database) {
      var xhr = new XMLHttpRequest({mozSystem: true});
     $http.get("http://localhost:3412/ClassDemo3Srv/getbeer",xhr)
     .success(function(products){
      var product = _.find(products, function(product){
        console.log("Esto es product:");
        console.log(product);
        return product.beerid == productId;
      });

      service.getRelatedProducts(product).then(function(related_products){
        product.related_products = related_products;
        //console.log(product);
      }, function(error){
        console.log("ups", error);
      });

      dfd.resolve(product);
    });
    return dfd.promise;
  };

  this.getRelatedProducts = function(product){
    var dfd = $q.defer();
    
    //$http.get('beer_db.json').success(function(database) {
      var xhr = new XMLHttpRequest({mozSystem: true});
     $http.get("http://localhost:3412/ClassDemo3Srv/getreviews",{params: {id: product.beerid}},xhr)
     .success(function(reviews){
    
      //add product data to this order

      console.log("HEHA...");
      var related_products = reviews;
      /*var related_products = _.map(reviews, function(product){
        console.log("Esto es product: dentro de map:");
        console.log(product);


        return _.find(reviews, function(reviews){
        console.log("Esto es reviews dentro de find:"); 
        console.log(reviews);

        console.log("Esto es reviews.beerid dentro de find:"); 
        console.log(reviews.beerid);
        console.log("Esto es product.beerid dentro de find:"); 
        console.log(product.beerid);


          return reviews.beerid == product.beerid; });
      });*/
      dfd.resolve(related_products);
      console.log(related_products);
    });

    return dfd.promise;
  };
})

.service('FoodService', function ($http, $q){
  this.getProducts = function(){
    var dfd = $q.defer();
    $http.get('http://localhost:3412/ClassDemo3Srv/getbusiness').success(function(database) {      
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
.service('TravelService', function ($http, $q){
  this.getProducts = function(){
    var dfd = $q.defer();
    $http.get('food_db.json').success(function(database) {
      dfd.resolve(database.products);
    });
    return dfd.promise;
  };

  this.getProduct = function(productId){
    var dfd = $q.defer();
    $http.get('food_db.json').success(function(database) {
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
