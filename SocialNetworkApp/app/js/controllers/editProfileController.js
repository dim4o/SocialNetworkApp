socialNetworkApp.controller('editProfileController',
    function socialNetworkApp($scope, $location, userProfileService) {

        $scope.editProfile = function (user) {
            //user.profileImageData = 'fdsfsdfadfsad';
            //user.coverImageData = 'fsdafasdfasdf';
            user.gender = 'Male';

            userProfileService.editUserProfile(user)
                .then(function () {
                    alert('Profile edited successfully!');
                    $location.path('/');
                }, function error(error) {
                    console.log(error);
                })
        };


        //$scope.addImage = function (myFile) {
        //    console.log(myFile);
        //};


        $scope.user = JSON.parse(sessionStorage['userData']);

        //$scope.getMyProfileData = function () {
        //    userProfileService.getMyProfileData()
        //        .then(function (userData) {
        //            console.log(userData);
        //            $scope.userData.email = 'email';
        //        }, function (error) {
        //            console.log(error);
        //        });
        //};
});
