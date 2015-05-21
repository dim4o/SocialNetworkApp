(function () {
    "use strict";

    socialNetworkApp.controller('loginController',
        function loginController($scope, $location, userData, userProfileService, authorizationService) {
            $scope.login = function (user) {
                //alert(user.username);
                userData.login(user)
                    .then(function (data) {
                        authorizationService.setAccessToken(data);

                        //userProfileService.getMyProfileData()
                        //    .then(function (data) {
                        //        sessionStorage['userData'] = JSON.stringify(data);
                        //        //loadData();
                        //    }, function (error) {
                        //
                        //    });
                        $location.path('/');
                    }, function (error) {
                        console.log(error);
                    })
            };
            //var loadData = function loadData() {
            //    if (sessionStorage['userData']) {
            //        $scope.profileImage = 'data:image/jpeg;base64,'
            //            + JSON.parse(sessionStorage['userData'])['profileImageData'];
            //    }
            //}

        });
}());

