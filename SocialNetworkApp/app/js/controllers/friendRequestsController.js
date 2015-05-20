socialNetworkApp.controller('friendRequestsController',
    function friendRequestsController($scope, userData) {
        $scope.friendRequestsData = {}

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
                    alert('Approved!')
                }, function () {

                });
        };

        $scope.rejectRequest = function (requestId) {
            userData.rejectRequest(requestId)
                .then(function () {

                }, function () {
                    alert('Rejected!')
                });
        }
    });