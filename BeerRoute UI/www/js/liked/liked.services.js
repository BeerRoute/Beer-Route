angular.module('your_app_name.liked.services', [])

.service('ListService', function ($http, $q, $rootScope){

  this.getUserLists = function(){
    /*var dfd = $q.defer();
    $http.get('logged_user_db.json').success(function(database) {
      dfd.resolve(database.user.lists);
    });
    return dfd.promise;*/

    //$scope.path = "";
    //$scope.name = "";
    //$scope.description = "";

    
    
    var xhr = new XMLHttpRequest({mozSystem: true});
    var dfd = $q.defer();
      $http.get("http://localhost:3412/ClassDemo3Srv/getwishlist",{params: {username: $rootScope.username}},xhr)
      .success(function(lists){
        console.log(lists);
              
        dfd.resolve(lists);


        /*var r = data;
        console.log(r);

        for(i=0; i<2;i++){
         path[i] = r[i].path;
         name[i] = r[i].beername;
         category[i] = r[i].description;
         
         console.log(path[i]);
         console.log(name[i]);
         console.log(category[i]);*/

        
        
      });
      

    

     return dfd.promise; 
  };

  /*this.getList = function(listId){
    var dfd = $q.defer();
    $http.get('logged_user_db.json').success(function(database) {
      var list = _.find(database.user.lists, function(list){
        return list.id == listId;
      });
      dfd.resolve(list);
    });

    return dfd.promise;
  };*/
})

;
