(function(){
    'use strict';
    angular.module('data')
    .controller('CategoryDetailController', CategoryDetailController);

    CategoryDetailController.$inject = ['items', 'MenuDataService']
    function CategoryDetailController(items, MenuDataService) {
        var category = this 
        category.items = items
        category.title = MenuDataService.title
        
    }
})();