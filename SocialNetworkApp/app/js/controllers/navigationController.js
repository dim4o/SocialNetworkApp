socialNetworkApp.controller('navigationController',
    function navigationController($scope, $location, $routeParams, $timeout,
                                  authorizationService, userProfileService, usSpinnerService) {
        console.log('Navigation Controller Initialization');
        usSpinnerService.stop('spinner-1');

        $scope.isLogged = authorizationService.isLogged();

        if (sessionStorage.getItem('userData')) {
            $scope.name = JSON.parse(sessionStorage.getItem('userData')).name;
        }


        if (sessionStorage.getItem('userData')) {
            $scope.profileImage = JSON.parse(sessionStorage.getItem('userData')).profileImageData;
        } else if($scope.isLogged){
            userProfileService.getMyProfileData()
                .then(function (data) {
                    sessionStorage['userData'] = JSON.stringify(data);
                    $scope.profileImage = data.profileImageData;
                    //$scope.currUserUsername = sessionStorage['username'];
                    $scope.name = data.name;

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
                //$route.reload;
                //will reinitialise the controllers but not the services.
                //If you want to reset the whole state of your application:
                window.location.reload();
                $scope.intervalFunction();
            }, 1740000)
        };
    });