socialNetworkApp.controller('userHomeController',
    function userHomeController($scope, userData) {

        //$scope.myFriendsData = {};

        $scope.currUserUsername = sessionStorage['username'];

        userData.getNewsFeedsPages()
            .then(function (newsFeedsData) {
                $scope.postsData = newsFeedsData;
                $scope.limit = 1000;
            }, function (error) {
                console.log(error);
            });

        // TODO: duplicate method - userWallController
        $scope.popupPersonPreview = function (username) {
            $scope.showPopup = true;
            $scope.userData = {};
            $scope.userData.profileImageData = './img/defaultProfileImage.png';
            userData.getUserPreviewData(username)
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
            userData.sendFriendRequest(username)
                .then(function (success) {
                    alert('Friend request sent !');
                    $scope.pending = true;
                }, function (error) {
                    console.log(error);
                })
        };
});