socialNetworkApp.controller('newsFeedController',
    function newsFeedController($scope, userProfileService, usersService, notificationService, usSpinnerService) {
        console.log('News and Feeds Controller Initialization');
        //$scope.myFriendsData = {};

        $scope.currUserUsername = sessionStorage['username'];

        // TODO: duplicate method - userWallController
        $scope.popupPersonPreview = function (username) {
            $scope.userData = {};
            $scope.userData.name = 'Name';
            $scope.userData.profileImageData = './img/defaultProfileImage.png';
            usersService.getUserPreviewData(username)
                .then(function (userData) {
                    $scope.userData = userData;
                    console.log(userData);
                    $scope.showPopup = true;
                }, function (error) {
                    console.log(error);
                });
        };

        $scope.hidePopupPreview = function () {
            $scope.showPopup = false;
        };

        //$scope.pending = false;
        //$scope.sendFriendRequest = function (username) {
        //    userProfileService.sendFriendRequest(username)
        //        .then(function (success) {
        //            notificationService.success("Success", "Friend request is sent.");
        //            $scope.pending = true;
        //        }, function (error) {
        //            notificationService.error("Error", "The request can not be sent;");
        //            console.log(error);
        //        })
        //};

        $scope.loadNewsFeed = function () {
            usSpinnerService.spin('spinner-1');
            userProfileService.getNewsFeedsPages('', 5)
                .then(function (postsData) {
                    console.log('First page post request: ');
                    console.log(postsData);
                    $scope.postsData = postsData;
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
            }
        };


        // new
        //userProfileService.getMyFriendsPreview()
        //    .then(function (ownFriendsPreviewData) {
        //        for (var i = 0; i < ownFriendsPreviewData.friends.length; i++) {
        //            if (!ownFriendsPreviewData.friends[i].profileImageData) {
        //                ownFriendsPreviewData.friends[i]
        //                    .profileImageData = './img/defaultProfileImagePreview.png';
        //            }
        //        }
        //        $scope.friendsPreviewList = ownFriendsPreviewData;
        //    }, function (error) {
        //        console.log(error);
        //    });
        //userProfileService.getOwnFriends()
        //    .then(function (ownFriendsData) {
        //        $scope.detailedFriendsList = ownFriendsData;
        //    }, function (error) {
        //        console.log(error);
        //    });
});