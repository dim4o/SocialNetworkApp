socialNetworkApp.controller('friendsController',
    function friendsController($scope, $routeParams, userProfileService, $rootScope,
                               notificationService, usersService, authorizationService,
                               PROFILE_IMAGE_PREVIEW) {

        var currUserUsername = $scope.currUserUsername;
        $scope.defaultProfileImagePreview = PROFILE_IMAGE_PREVIEW;

        $scope.loadFriendsPreview = function () {
            if (!currUserUsername
                || currUserUsername == authorizationService.getUsername()) {
                userProfileService.getMyFriendsPreview()
                    .then(function (ownFriendsPreviewData) {
                        $scope.friendsPreviewList = ownFriendsPreviewData;
                        $rootScope.friendsCount = ownFriendsPreviewData.totalCount;
                    }, function (error) {
                        console.log(error);
                    });
            } else {
                usersService.getFriendsFriendsPreview(currUserUsername)
                    .then(function (fiendsFriendsData) {
                        console.log(fiendsFriendsData);
                        $scope.friendsPreviewList = fiendsFriendsData; // TODO: za redakciq
                        $rootScope.friendsCount = fiendsFriendsData.totalCount;
                    }, function (error) {
                        console.log(error);
                    });
            }
        };

        $scope.loadFriendsList = function () {
            if ($routeParams.username == authorizationService.getUsername()) {
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


        // NEW ---------------------------------------
        $scope.friendRequestsData = {};
        $scope.defaultProfileImagePreview = PROFILE_IMAGE_PREVIEW;
        //showFriendRequests();
        // TODO: very similar
        $scope.getNumberOfRequests = function () {
            userProfileService.getFriendRequests()
                .then(function (friendRequestsData) {
                    $scope.numberOfRequests = friendRequestsData.length;
                }, function error(error) {
                    console.log(error);
                })
        };

        $scope.getNumberOfRequests();

        // TODO: very similar
        //$scope.showRequests = false;
        $scope.showFriendRequests = function () {
            userProfileService.getFriendRequests()
                .then(function (friendRequestsData) {
                    $scope.friendRequestsData = friendRequestsData;
                    if ($scope.friendRequestsData.length > 0) {
                        $scope.showRequests = true;
                    }
                }, function error(error) {
                    console.log(error);
                })
        };

        $scope.isFriends = false;
        $scope.acceptRequest = function (request) {
            userProfileService.approveFriendRequest(request.id)
                .then(function (success) {
                    $scope.numberOfRequests--;
                    $scope.isFriends = true;
                    $rootScope.friendsCount++;
                    notificationService.success('Success', 'You and ' +
                        request.user.name + ' are now friends!')
                }, function (error) {
                    notificationService.error('Error', 'Sorry, the request isn\'t accepted.');
                    console.log(error);
                });
        };

        $scope.rejectRequest = function (request, index) {
            userProfileService.rejectFriendRequest(request.id)
                .then(function () {
                    $scope.numberOfRequests--;
                    $scope.friendRequestsData.splice(index, 1);
                    notificationService.success('Success', 'The request from ' +
                        request.user.name + ' was successfully rejected.')
                }, function (error) {
                    notificationService.error('Error', 'Sorry, the request isn\'t accepted.');
                    console.log(error);
                });
        };

        // TODO: same method exists
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
    });