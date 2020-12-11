(function(){
    'use strict';
    angular.module('common')
    .service('SignupService', SignupService);

   SignupService.$inject = ['$http', 'ApiPath'];
   function SignupService($http, ApiPath){
    var service = this;
    var user = {}
    var fav = {}

    service.storeUser = function(form){
        user.fname = form.fname 
        user.lname = form.lname 
        user.email = form.email 
        user.phone = form.phone 
        user.fav = form.fav 
        console.log('User.fav: ', user.fav)
        fav = service.getFav(form.fav) 
        console.log("my fav: ", fav)
        service.fav = fav
        console.log("service.fav: ", service.fav)
    }
    service.getUser = function(){
        return user
    }
    service.getFav = function(short_name){
        console.log('Short code: ', short_name)
        console.log("url: ", ApiPath + '/menu_items/' + short_name + '.json')
        return $http.get(ApiPath + '/menu_items/' + short_name + '.json').then(function(response){
            service.fav = response.data
            return response.data
        })
    }
    
   }
})();