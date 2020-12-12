(function(){
    'use strict';

    angular.module('public')
    .component('signUp', {
        templateUrl: 'src/public/signup/signup.template.html',
        bindings:{
            onSubmit: '&'
        },
        controller:SignupController
    });

    SignupController.$inject = ['SignupService']
    function SignupController(SignupService){
        var $ctrl = this;
        var signup = SignupService
        $ctrl.user = signup.getUser()
        $ctrl.fname = "";
        $ctrl.lname = "";
        $ctrl.email = "";
        $ctrl.phone = "";
        $ctrl.fav = "";
        $ctrl.registered = false;

        $ctrl.submit = function(){
            var user = {
                fname:$ctrl.fname,
                lname:$ctrl.lname,
                email:$ctrl.email,
                phone:$ctrl.phone,
                fav:$ctrl.fav
            }
          signup.storeUser(user)
          signup.user = user
        $ctrl.registered = true
          
        }
        $ctrl.user =  signup.user
    }
})();