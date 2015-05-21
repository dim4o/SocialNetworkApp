(function () {
    "use strict";

    socialNetworkApp.controller('registerController',
        function registerController($scope, $location, userData, userProfileService, authorizationService) {
            $scope.register = function (user) {
                userData.register(user)
                    .then(function (data) {
                        authorizationService.setAccessToken(data);
                        userProfileService.getMyProfileData()
                            .then(function (data) {
                                sessionStorage['userData'] = JSON.stringify(data);
                                //loadData();
                            }, function (error) {

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
