(function() {
    'use strict'

    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('apiMenuPath', 'https://davids-restaurant.herokuapp.com/menu_items.json')
    .directive('foundItems', FoundItemsDirective);


    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'templates/found_items.html',
            scope: {
                items: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs:'list',
            bindToController:true,
        }
        return ddo;
    }
    
    function FoundItemsDirectiveController() {
        var list = this;
    }

    NarrowItDownController.$inject = ['MenuSearchService']
    function NarrowItDownController (MenuSearchService) {
        var list = this;
        list.search = '';
        list.items = [];
        list.errorMsg = '';
        list.found = function(){
            var promise = MenuSearchService.getMatchedMenuItems(list.search);
            promise.then(function(response) {
              list.items = response;
              if (list.items.length < 1){
                  list.errorMsg = "Not Found"
              }
              else { list.errorMsg=""}
            })
            .catch(function(error){
                console.log("Something went wrong here! Working on it .....")
            })
        }
        list.removeItem = function(index) {
            MenuSearchService.removeItem(index)
        }
        

    }
    
    MenuSearchService.$inject = ['$http', 'apiMenuPath']
    function MenuSearchService ($http, apiMenuPath) {
        var service = this;
        var foundItems = []


        service.getMatchedMenuItems = function(searchedItem){
            return $http({
                method: 'GET',
                url: apiMenuPath,
            })
            .then(function(response){
                var items = response.data.menu_items 
                if(searchedItem !== undefined) {
                    for (var i=0; i < items.length; i++) {
                        if (items[i].name.toLowerCase().indexOf(searchedItem) >= 0){
                           foundItems.push(items[i])
                        }
                        
                    }
                    return foundItems
                } else {
                    foundItems = []
                    return foundItems
                }
            })
        }
        service.removeItem = function(itemIndex) {
            foundItems.splice(itemIndex, 1)
        }
    }
})();