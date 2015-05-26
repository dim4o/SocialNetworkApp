socialNetworkApp.controller('editProfileController',
    function socialNetworkApp($scope, $location, userProfileService, notificationService) {

        $scope.editProfile = function (user) {
            user.gender = 'Male';

            userProfileService.editUserProfile(user)
                .then(function () {
                    notificationService.success("Success", "Profile successfully edited.");
                        //userProfileService.getMyProfileData()
                        //    .then(function (userData) {
                        //        sessionStorage['userData'] = JSON.stringify(userData);
                        //        $location.path('/');
                        //    }, function (error) {
                        //        console.log(error);
                        //    });

                    //$location.path('/');
                }, function error(error) {
                    notificationService.error("Error", "Failed to edit profile!");
                    console.log(error);
                })
                .then(function () {
                    userProfileService.getMyProfileData()
                        .then(function (userData) {
                            sessionStorage['userData'] = JSON.stringify(userData);
                            $location.path('/');
                        }, function (error) {
                            notificationService.error("Error", "Cannot load your profile data.");
                            console.log(error);
                        });
                });
        };

        $scope.isEmptyImage = function (image) {

            return !image;
        };


        //$scope.addImage = function (myFile) {
        //    console.log(myFile);
        //};


        $scope.user = JSON.parse(sessionStorage['userData']);
        if ($scope.user.profileImageData == null) {
            //$scope.user.profileImageData = './img/defaultProfileImage.png';
            console.log($scope.user.profileImageData);

        } else {
            console.log($scope.user.profileImageData);
        }
        //if ($scope.user.coverImageData == null) {
        //    $scope.user.coverImageData = './img/defaultProfileImage.png';
        //}
        console.log($scope.user);
        console.log($scope.user.profileImageData);

});
