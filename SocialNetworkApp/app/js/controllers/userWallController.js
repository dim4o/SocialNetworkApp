socialNetworkApp.controller('userWallController',
    function ($scope, usersService, $routeParams) {
        //$scope.userWallData = {};

        $scope.currUserUsername = $routeParams.username;

        usersService.getFriendWallByPages($routeParams.username)
                .then(function (userWallDataInfo) {
                    $scope.postsData = userWallDataInfo;
                    console.log($scope.postsData);
                    $scope.currentUsername = $routeParams.username;
                }, function (error) {
                     console.log(error);
                });
        //userData.getNewsFeedsPages()
        //    .then(function (newsFeedsData) {
        //        $scope.newsFeedsData = newsFeedsData;
        //        $scope.limit = 1000;
        //    }, function (error) {
        //        console.log(error);
        //    });

        //};
        usersService.getUserFullData($routeParams.username)
            .then(function (userFullData) {
                $scope.currUserUsername = null;
                $scope.userFullData = userFullData;
                $scope.currUserUsername = userFullData.username;
            }, function (error) {
                console.log(error);
            });

        // TODO: duplicate method - newsFeedsController
        $scope.popupPersonPreview = function (username) {
            $scope.showPopup = true;
            $scope.userData = {};
            $scope.userData.profileImageData = './img/defaultProfileImage.png';
            usersService.getUserPreviewData(username)
                .then(function (userData) {
                    $scope.userData = userData;
                    console.log(userData);
                }, function (error) {
                    console.log(error);
                });
        };
        //userData.getFriendsFriendsPreview($routeParams.username)
        //    .then(function (fiendsFriendsData) {
        //        console.log(fiendsFriendsData);
        //        alert('Friends');
        //    }, function (error) {
        //        console.log(error);
        //    });
        
    });
