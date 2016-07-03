socialNetworkApp.controller('editProfileController',
    function socialNetworkApp($scope, $location, userProfileService,
                              notificationService, authorizationService) {

        $scope.editProfile = function (user) {
            //user.gender = 'Male';

            userProfileService.editUserProfile(user)
                .then(function () {
                    notificationService.success("Success", "Profile successfully edited.");
                }, function error(error) {
                    notificationService.error("Error", "Failed to edit profile!");
                    console.log(error);
                })
                .then(function () {
                    userProfileService.getMyProfileData()
                        .then(function (userData) {
                            authorizationService.setUserData(userData);
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

        // TODO: delete
        $scope.user = authorizationService.getUserData();
});
