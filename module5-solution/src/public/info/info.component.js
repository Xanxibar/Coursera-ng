(function(){
    'use strict';
    angular.module('public')
    .component('info', {
        templateUrl: 'src/public/info/info.template.html',
        bindings: {
            user: '<',
            fav: '<'
        },
        controller: InfoController,

    });

    InfoController.$inject = ['SignupService', 'ApiPath']
    function InfoController(SignupService, ApiPath){
        var $ctrl = this;
        var signup = SignupService
        $ctrl.user = signup.getUser()
        $ctrl.fav = signup.fav
        $ctrl.basePath = ApiPath

    }
})();
