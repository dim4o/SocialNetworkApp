socialNetworkApp.controller('changePasswordController',
    function changePasswordController($scope, $location, userProfileService) {

        $scope.changeProfilePassword = function (user) {
            userProfileService.changeProfilePassword(user)
                .then(function () {
                    alert('Password edited successfully!');
                    $location.path('/');
                }, function error(error) {
                    console.log(error);
                })
        };
    });