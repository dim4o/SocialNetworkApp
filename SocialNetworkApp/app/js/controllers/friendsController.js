socialNetworkApp.controller('friendsController',
    function friendsController($scope, $routeParams, userData) {

        //$scope.ownFriends = {};

        $scope.loadFriendsPreview = function () {
            if (!$routeParams.username) {
                console.log();
                userData.getMyFriendsPreview()
                    .then(function (ownFriendsPreviewData) {
                        for (var i = 0; i < ownFriendsPreviewData.friends.length; i++) {
                            if (!ownFriendsPreviewData.friends[i].profileImageData) {
                                ownFriendsPreviewData.friends[i]
                                    .profileImageData = './img/defaultProfileImage.png';
                            }
                        }
                        $scope.friendsPreviewList = ownFriendsPreviewData;
                    }, function (error) {
                        console.log(error);
                    });
            } else {
                var friendsUsername = $routeParams.username;
                userData.getFriendsFriendsPreview(friendsUsername)
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
                userData.getOwnFriends()
                    .then(function (ownFriendsData) {
                        $scope.detailedFriendsList = ownFriendsData;
                    }, function (error) {
                        console.log(error);
                    });
            } else {
                userData.getDetailedFriendsFriendsList($routeParams.username)
                    .then(function (detailedFriendsFriendsList) {
                        $scope.detailedFriendsList = detailedFriendsFriendsList;
                    }, function (error) {
                        console.log(error);
                    });
            }
        };


    });