socialNetworkApp.controller('editProfileController',
    function socialNetworkApp($scope, $location, userProfileService) {

        $scope.editProfile = function (user) {
            //user.profileImageData = 'fdsfsdfadfsad';
            //user.coverImageData = 'fsdafasdfasdf';
            user.gender = 'Male';

            userProfileService.editUserProfile(user)
                .then(function () {
                    alert('Profile edited successfully!');

                        userProfileService.getMyProfileData()
                            .then(function (userData) {
                                sessionStorage['userData'] = JSON.stringify(userData);
                            }, function (error) {
                                console.log(error);
                            });

                    $location.path('/');
                }, function error(error) {
                    console.log(error);
                })
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
