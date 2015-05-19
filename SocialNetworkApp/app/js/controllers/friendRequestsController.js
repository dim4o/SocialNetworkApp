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
        }
    });