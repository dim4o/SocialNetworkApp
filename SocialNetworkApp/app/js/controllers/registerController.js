(function () {
    "use strict";

    socialNetworkApp.controller('registerController',
        function registerController($scope, $location, usersService, userProfileService,
                                    authorizationService, notificationService) {
            $scope.register = function (user) {
                usersService.register(user)
                    .then(function (data) {
                        authorizationService.setAccessToken(data);
                        userProfileService.getMyProfileData()
                            .then(function (data) {
                                notificationService.success("Success", "Registration successful");
                                sessionStorage['userData'] = JSON.stringify(data);
                                //loadData();
                            }, function (error) {
                                notificationService.error("Error", "Failed to register!");
                            });
                        $location.path('/');
                }, function (response) {
                    //var errors = response['modelState'][''];
                    //errors.forEach(function (error) {
                    //    //notifier.error(error);
                    //    console.log(error);
                    //});
                })
            };
            //$scope.a = 'fsdfsdfsdfsdfsdfsd';
            //$scope.user = {
            //    gender: 'Male'
            //};
        });


}());
