(function(){
    'use strict';
    
    angular.module('data',)
    .service('MenuDataService', MenuDataService);
    
    MenuDataService.$inject = ['$http']
    function MenuDataService($http) {
        var service = this;
        var menuItems = [];
        service.title = ""

        service.getAllCategories = function() {
            return $http({
                method: 'GET',
                url: 'https://davids-restaurant.herokuapp.com/categories.json'
            })
            .then(function(response){
                var items = response.data 
                return items
            })
            
        }
        service.getItemsForCategory = function(categoryShortName){
            return $http({
                method: 'GET',
                url: 'https://davids-restaurant.herokuapp.com/menu_items.json',
                params: {
                    category:categoryShortName
                }
            })
            .then(function(response){
                service.title = response.data.category.name
                var items = response.data.menu_items
                return items
            })
        
            
        }
    }
})();