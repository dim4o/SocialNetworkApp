(function () {
    "use strict";

    socialNetworkApp.controller('loginController',
        function loginController($scope, $location, usersService, userProfileService,
                                 authorizationService, notificationService, usSpinnerService) {

            $scope.login = function (user) {
                usSpinnerService.spin('spinner-1');
                usersService.login(user)
                    .then(function (data) {
                        authorizationService.setUsername(data.userName);
                        //sessionStorage.setItem('username', data.userName);
                        authorizationService.setAccessToken(data);
                        notificationService.success("Welcome " + data.userName, "Login successful");
                        $location.path('/');
                        //return data;
                        usSpinnerService.stop('spinner-1');
                    }, function (error) {
                        notificationService.error("Error", "Failed to login! Please try again later.");
                        usSpinnerService.stop('spinner-1')
                        console.log(error);
                    })
            };

            usSpinnerService.stop('spinner-1');
        });
}());

