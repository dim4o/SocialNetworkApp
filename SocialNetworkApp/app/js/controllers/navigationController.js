socialNetworkApp.controller('navigationController',
    function navigationController($scope, $routeParams, authorizationService, userProfileService) {
        $scope.isLogged = authorizationService.isLogged();

        if (sessionStorage.getItem('userData')) {
            $scope.profileImage = JSON.parse(sessionStorage.getItem('userData')).profileImageData;
        } else if($scope.isLogged){
            userProfileService.getMyProfileData()
                .then(function (data) {
                    sessionStorage['userData'] = JSON.stringify(data);
                    $scope.profileImage = data.profileImageData;
                    //$scope.currUserUsername = sessionStorage['username'];
                }, function (error) {
                    console.log(error);
                });
        }
    });