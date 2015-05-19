(function () {
    "use strict";

    socialNetworkApp.controller('logoutController',
        function logoutController($scope, $location, userData, authorizationService) {
            $scope.logout = function () {
                //alert(user.username);
                userData.logout()
                    .then(function (success) {
                        $location.path('/');
                        alert('Logged Out!');
                        authorizationService.cleanSessionStorage();
                    }, function (error) {
                        console.log(error);
                    });
            }
        });
}());