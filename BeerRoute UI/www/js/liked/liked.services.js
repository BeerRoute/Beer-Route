angular.module('your_app_name.liked.services', [])

.service('ListService', function ($http, $q, $rootScope,$ionicPopup){

  this.getUserLists = function(){
    
    var xhr = new XMLHttpRequest({mozSystem: true});
    var dfd = $q.defer();
      $http.get("http://localhost:3412/ClassDemo3Srv/getwishlist",{params: {username: $rootScope.username}},xhr)
      .success(function(lists){
        console.log(lists);
              
        dfd.resolve(lists);

        
      })


      .error(function(data,status){
        $ionicPopup.alert(
        {title: "Error",
        template: "Could not connect to server. Please try again later"});
        });
      

    

     return dfd.promise; 
  };


})

;
