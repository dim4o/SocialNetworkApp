socialNetworkApp.controller('userHomeController',
    function userHomeController($scope, userProfileService, usersService, notificationService, usSpinnerService) {
        console.log('News and Feeds Controller Initialization');
        //$scope.myFriendsData = {};
        usSpinnerService.stop('spinner-1');
        $scope.currUserUsername = sessionStorage['username'];

        //userData.getNewsFeedsPages('', 10)
        //    .then(function (newsFeedsData) {
        //        $scope.postsData = newsFeedsData;
        //        $scope.limit = 1000;
        //    }, function (error) {
        //        console.log(error);
        //    });

        // TODO: duplicate method - userWallController
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

        $scope.hidePopupPreview = function () {
            $scope.showPopup = false;
        };

        $scope.pending = false;
        $scope.sendFriendRequest = function (username) {
            userProfileService.sendFriendRequest(username)
                .then(function (success) {
                    notificationService.success("Success", "Friend request is sent.");
                    $scope.pending = true;
                }, function (error) {
                    notificationService.error("Error", "The request can not be sent;");
                    console.log(error);
                })
        };

        // Pagination
        console.log('Pagination Controller Initialization');
        //$scope.postss = {};
        usSpinnerService.spin('spinner-1');

        userProfileService.getNewsFeedsPages('', 5)
            .then(function (postsData) {
                console.log('First page post request: ');
                console.log(postsData);
                //return postsData;
                $scope.postsData = postsData;

                $scope.loadMore = function () {
                    var lastPost = $scope.postsData[$scope.postsData.length - 1];
                    usSpinnerService.spin('spinner-1');
                    userProfileService.getNewsFeedsPages(lastPost.id, 5)
                        .then(function (newPostsData) {
                            for (var i = 0; i < newPostsData.length; i++) {
                                $scope.postsData.push(newPostsData[i]);
                            }
                            usSpinnerService.stop('spinner-1');
                            console.log('New pages post requests: ');
                            console.log(newPostsData);
                        }, function () {
                            console.log(error);
                        });
                };
                usSpinnerService.stop('spinner-1');
            }, function (error) {
                console.log(error);
            });
});