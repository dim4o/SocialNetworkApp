socialNetworkApp.controller('navigationController',
    function navigationController($scope, $location, $routeParams, $timeout, $rootScope,
                                  authorizationService, userProfileService, usSpinnerService) {
        console.log('Navigation Controller Initialization');
        usSpinnerService.stop('spinner-1');

        $scope.isLogged = authorizationService.isLogged();

        if (sessionStorage.getItem('userData')) {
            $rootScope.name = JSON.parse(sessionStorage.getItem('userData')).name;
            $scope.username = authorizationService.getUsername();
        }


        if (sessionStorage.getItem('userData')) {
            $scope.profileImage = JSON.parse(sessionStorage.getItem('userData')).profileImageData;
        } else if($scope.isLogged){
            userProfileService.getMyProfileData()
                .then(function (data) {
                    sessionStorage['userData'] = JSON.stringify(data);
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

        $scope.intervalFunction = function(){
            $timeout(function() {
                $location.path('/');
                window.location.reload();
                $scope.intervalFunction();
            }, 1740000)
        };
    });