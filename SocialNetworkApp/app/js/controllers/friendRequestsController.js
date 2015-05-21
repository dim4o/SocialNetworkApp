socialNetworkApp.controller('friendRequestsController',
    function friendRequestsController($scope, userData) {
        $scope.friendRequestsData = {};
        //showFriendRequests();
        $scope.getNumberOfRequests = function () {
            userData.getFriendRequests()
                .then(function (friendRequestsData) {
                    $scope.numberOfRequests = friendRequestsData.length;
                }, function error(error) {
                    console.log(error);
                })
        };

        $scope.getNumberOfRequests();

        $scope.showFriendRequests = function () {
            userData.getFriendRequests()
                .then(function (friendRequestsData) {
                    $scope.friendRequestsData = friendRequestsData;
                }, function error(error) {
                    console.log(error);
                })
        };

        $scope.acceptRequest = function (requestId) {
            userData.approveFriendRequest(requestId)
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