socialNetworkApp.controller('userWallController',
    function ($scope, usersService, $routeParams, usSpinnerService,
              authorizationService, PAGE_SIZE) {
        //$scope.userWallData = {};

        $scope.currUserUsername = $routeParams.username;

        $scope.isMyOwnWall = function () {
            return $scope.currUserUsername == authorizationService.getUsername();
        };

        usersService.getUserFullData($routeParams.username)
            .then(function (userFullData) {
                //$scope.nameOfUser = userFullData.name;
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

        $scope.loadUserWall = function() {
            usSpinnerService.spin('spinner-1');
            usersService.getFriendWallByPages($routeParams.username, '', PAGE_SIZE)
                .then(function (postsData) {
                    $scope.postsData = postsData;
                    $scope.currentUsername = $routeParams.username;
                    usSpinnerService.stop('spinner-1');
                }, function (error) {
                    console.log(error);
                });
        };

        // Pagination
        $scope.loadMore = function () {
            if ($scope.postsData && $scope.postsData.length > 0) {
                var lastPost = $scope.postsData[$scope.postsData.length - 1];
                usSpinnerService.spin('spinner-1');
                usersService.getFriendWallByPages($routeParams.username, lastPost.id, PAGE_SIZE)
                    .then(function (newPostsData) {
                        for (var i = 0; i < newPostsData.length; i++) {
                            $scope.postsData.push(newPostsData[i]);
                        }
                        usSpinnerService.stop('spinner-1');
                    }, function () {
                        console.log(error);
                    });
            }
        };
    });
