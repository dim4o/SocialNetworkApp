socialNetworkApp.controller('friendRequestsController',
    function friendRequestsController($scope, userProfileService) {
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
        }
    });