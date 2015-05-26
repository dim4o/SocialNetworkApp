(function () {
    "use strict";

    socialNetworkApp.controller('loginController',
        function loginController($scope, $location, userData, userProfileService,
                                 authorizationService, notificationService) {
            $scope.login = function (user) {
                userData.login(user)
                    .then(function (data) {
                        sessionStorage.setItem('username', data.userName);
                        authorizationService.setAccessToken(data);
                        notificationService.success("Welcome " + data.userName, "Login successful");
                        $location.path('/');
                    }, function (error) {
                        notificationService.error("Error", "Failed to login! Please try again later.");
                        console.log(error);
                    })
            };
        });
}());

