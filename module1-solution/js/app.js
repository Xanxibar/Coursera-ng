(function(){
    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LCController);

    LCController.$inject = ["$scope"]
    function LCController($scope) {
        $scope.dishes = ""
        $scope.message = ""

        $scope.checkTooMuch = function() {
            isTooMuch($scope.dishes)

        }
        function isTooMuch(string) {
            var dishesLength = string.split(",").length
            console.log("dishes length: " + dishesLength)
            if ($scope.dishes==""){
                $scope.message = "Please enter data first"
            }
            else if (dishesLength <= 3 ) {
                $scope.message = "Enjoy!"
            }
            else if (dishesLength > 3) {
                $scope.message = "Too much!"
            }
            

        }
    }
})();