(function () {
    "use strict";

    socialNetworkApp.controller('logoutController',
        function logoutController($scope, $location, userData, authorizationService) {
            $scope.logout = function () {

                //alert(user.username);
                userData.logout()
                    .then(function (success) {
                        authorizationService.cleanSessionStorage();
                        $scope.isLogged = false;

                        //alert('Logged Out!');
                    }, function (error) {
                        console.log(error);
                    })
                    .then(function () {
                        $location.path('/logout');
                    });
            }
        });
}());