(function () {
    "use strict";

    socialNetworkApp.controller('loginController',
        function loginController($scope, $location, userData, userProfileService,
                                 authorizationService, notificationService, usSpinnerService) {

            //$scope.stopSpin = (function(){
            //    usSpinnerService.stop('spinner-1');
            //    $scope.spinneractive = false;
            //}());
            //$scope.delay = 0;
            //$scope.minDuration = 0;
            //$scope.message = 'Please Wait...';
            //$scope.backdrop = true;
            //$scope.promise = null;

            $scope.login = function (user) {
                usSpinnerService.spin('spinner-2');
                userData.login(user)
                    .then(function (data) {
                        sessionStorage.setItem('username', data.userName);
                        authorizationService.setAccessToken(data);
                        notificationService.success("Welcome " + data.userName, "Login successful");
                        $location.path('/');
                        //return data;
                        usSpinnerService.stop('spinner-2');
                    }, function (error) {
                        notificationService.error("Error", "Failed to login! Please try again later.");
                        console.log(error);
                    })
            };

            usSpinnerService.stop('spinner-1');
        });
}());

