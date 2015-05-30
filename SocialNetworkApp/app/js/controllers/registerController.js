(function () {
    "use strict";

    socialNetworkApp.controller('registerController',
        function registerController($scope, $location, usersService, userProfileService,
                                    authorizationService, notificationService, usSpinnerService) {
            $scope.register = function (user) {
                usSpinnerService.spin('spinner-1');
                usersService.register(user)
                    .then(function (data) {
                        authorizationService.setAccessToken(data);
                        userProfileService.getMyProfileData()
                            .then(function (data) {
                                notificationService.success("Success", "Registration successful");
                                sessionStorage['userData'] = JSON.stringify(data);
                                usSpinnerService.stop('spinner-1')
                            }, function (error) {
                                notificationService.error("Error", "Failed to register!");
                                console.log(error);
                            });
                        $location.path('/');
                }, function (error) {
                        usSpinnerService.stop('spinner-1')
                })
            };
        });
}());
