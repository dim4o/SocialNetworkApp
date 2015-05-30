socialNetworkApp.controller('friendsController',
    function friendsController($scope, $routeParams, userProfileService, usersService) {

        $scope.loadFriendsPreview = function () {
            if (!$routeParams.username) {
                userProfileService.getMyFriendsPreview()
                    .then(function (ownFriendsPreviewData) {
                        for (var i = 0; i < ownFriendsPreviewData.friends.length; i++) {
                            if (!ownFriendsPreviewData.friends[i].profileImageData) {
                                ownFriendsPreviewData.friends[i]
                                    .profileImageData = './img/defaultProfileImagePreview.png';
                            }
                        }
                        $scope.friendsPreviewList = ownFriendsPreviewData;
                    }, function (error) {
                        console.log(error);
                    });
            } else {
                var friendsUsername = $routeParams.username;
                usersService.getFriendsFriendsPreview(friendsUsername)
                    .then(function (fiendsFriendsData) {
                        console.log(fiendsFriendsData);
                        $scope.friendsPreviewList = fiendsFriendsData; // TODO: za redakciq
                    }, function (error) {
                        console.log(error);
                    });
            }
        };

        $scope.loadFriendsList = function () {
            if ($routeParams.username == sessionStorage['username']) {
                console.log($routeParams.username);
                userProfileService.getOwnFriends()
                    .then(function (ownFriendsData) {
                        $scope.detailedFriendsList = ownFriendsData;
                    }, function (error) {
                        console.log(error);
                    });
            } else {
                usersService.getDetailedFriendsFriendsList($routeParams.username)
                    .then(function (detailedFriendsFriendsList) {
                        $scope.detailedFriendsList = detailedFriendsFriendsList;
                    }, function (error) {
                        console.log(error);
                    });
            }
        };
    });