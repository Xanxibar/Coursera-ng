(function(){
    'use strict';

    angular.module('data')
    .controller('CategoryController', CategoryController);

    CategoryController.$inject = ['items']
    function CategoryController(items){
        var categoryList = this;
        categoryList.items = items
    }
})();
