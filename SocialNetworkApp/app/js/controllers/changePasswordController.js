socialNetworkApp.controller('changePasswordController',
    function changePasswordController($scope, $location, userProfileService, notificationService) {

        $scope.changeProfilePassword = function (user) {
            userProfileService.changeProfilePassword(user)
                .then(function () {
                    notificationService.success("Success", "Password changed successful");
                    $location.path('/');
                }, function error(error) {
                    notificationService.error("Error", "Failed to change password!");
                    console.log(error);
                })
        };
    });