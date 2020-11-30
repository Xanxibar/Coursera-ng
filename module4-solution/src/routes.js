(function(){
    'use strict'

    angular.module('MenuApp')
    .config(RoutesConfig);
    
    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');  //catchall
        
        // Home Page
        $stateProvider.state('home', {
            url: '/',
            templateUrl: 'src/menu/templates/home.template.html'
        })
        .state('categoryList', {
            url: '/categories',
            templateUrl: 'src/menu/templates/main-categories.template.html',
            controller: 'CategoryController as categoryList',
            resolve: {
                items: ['MenuDataService', function(MenuDataService){
                    return MenuDataService.getAllCategories();
                }]
            }
        })
        .state('items', {
            url: '/{shortName}/items',
            templateUrl: 'src/menu/templates/category-items.template.html',
            controller: 'CategoryDetailController as categoryDetail',
            resolve: {
                items: ['$stateParams', 'MenuDataService', 
                      function($stateParams, MenuDataService){
                          var menu =  MenuDataService.getItemsForCategory($stateParams.shortName)
                          return menu
                      }]
            }
        })
    }

})();