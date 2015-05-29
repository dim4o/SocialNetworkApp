socialNetworkApp.controller('friendRequestsController',
    function friendRequestsController($scope, userProfileService, notificationService) {
        $scope.friendRequestsData = {};
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
        $scope.showFriendRequests = function () {
            userProfileService.getFriendRequests()
                .then(function (friendRequestsData) {
                    $scope.friendRequestsData = friendRequestsData;
                }, function error(error) {
                    console.log(error);
                })
        };

        $scope.acceptRequest = function (requestId) {
            userProfileService.approveFriendRequest(requestId)
                .then(function () {
                    $scope.numberOfRequests--;
                    alert('Approved!')
                }, function () {

                });
        };

        $scope.rejectRequest = function (requestId) {
            userData.rejectRequest(requestId)
                .then(function () {
                    $scope.numberOfRequests--;
                }, function () {
                    alert('Rejected!')
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