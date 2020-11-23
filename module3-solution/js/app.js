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
        list.items = MenuSearchService.items
        list.found = function(searchItem){
            return MenuSearchService.getMatchedMenuItems(searchItem);
        }
        list.removeItem = function(index) {
            MenuSearchService.removeItem(index)
        }

    }
    
    MenuSearchService.$inject = ['$http', 'apiMenuPath']
    function MenuSearchService ($http, apiMenuPath) {
        var service = this;
        service.items = []

        service.getMatchedMenuItems = function (searchedItem) {
            var response = $http({
                method: 'GET',
                url: apiMenuPath,
            })
            return response
            .then( function(result) {
                var items = result.data.menu_items
                for (var i=0; i< items.length; i++){
                    if (items[i].name.indexOf(searchedItem) >= -1){
                        service.items.push(items[i])
                    }
                }
                return service.items
            })
        }
        service.removeItem = function(itemIndex) {
            service.items.splice(itemIndex, 1)
        }
    }
})();