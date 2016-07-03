socialNetworkApp.controller('navigationController',
    function navigationController($scope, $location, $routeParams, $timeout, $rootScope,
                                  authorizationService, userProfileService,
                                  usSpinnerService, REFRESH_INTERVAL) {
        console.log('Navigation Controller Initialization');
        usSpinnerService.stop('spinner-1');

        $scope.isLogged = authorizationService.isLogged();
        $scope.isMyOwnWall = function () {
            return $routeParams.username == authorizationService.getUsername();
        };

        if (authorizationService.getUserData()) {
            $rootScope.name = authorizationService.getUserData().name;
            $scope.username = authorizationService.getUsername();
        }


        if (authorizationService.getUserData()) {
            $scope.profileImage = authorizationService.getUserData().profileImageData;
        } else if($scope.isLogged){
            userProfileService.getMyProfileData()
                .then(function (data) {
                    authorizationService.setUserData(data);
                    //sessionStorage['userData'] = JSON.stringify(data);
                    $scope.profileImage = data.profileImageData;
                    //$scope.currUserUsername = sessionStorage['username'];
                    //$scope.name = data.name;
                    $scope.username = data.username;
                }, function (error) {
                    console.log(error);
                });
        }

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

        // Refresh every 29 (REFRESH_INTERVAL) minutes
        $scope.intervalFunction = function(){
            $timeout(function() {
                $location.path('/');
                window.location.reload();
                $scope.intervalFunction();
            }, REFRESH_INTERVAL)
        };
    });