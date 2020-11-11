(function(){
    'use strict';

    angular.module('ShoppingListApp', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService']
    function ToBuyController(ShoppingListCheckOffService) {
        var toBuy = this;
        toBuy.toBuyItems = ShoppingListCheckOffService.getToBuyItems()
        toBuy.buyItem = function(index) {
            ShoppingListCheckOffService.buyItem(index);

        }

    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService']
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var bought = this;
        bought.boughtItems = ShoppingListCheckOffService.getBoughtItems()
    }

    function ShoppingListCheckOffService() {
        var service = this;
        var toBuy = [
            '1 carton of eggs', '10 bags of cookies', '2 bottles of Coke(drink not the drug)',
            '5 cans of tuna', '4 parcels of Bread', '2 packs of sausages'];
        var bought = [];

        service.getToBuyItems = function() {
            return toBuy;
        }

        service.getBoughtItems = function(){
            return bought
        }

        service.buyItem = function(index) {
            bought.push(toBuy[index])
            toBuy.splice(index, 1)

        }
    }
}

)();