socialNetworkApp.controller('userHomeController',
    function userHomeController($scope, userData) {
        $scope.users = {};
        userData.getOwnFriends()
            .then(function (ownFriendsData) {
                ownFriendsData.forEach(function (user) {
                    if (!user.profileImageData) {
                        user.profileImageData = './img/defaultProfileImage.png';
                    }
                });
                $scope.users = ownFriendsData;
            }, function (error) {
                console.log(error);
            });

        userData.getNewsFeedsPages()
            .then(function (newsFeedsData) {
                $scope.newsFeedsData = newsFeedsData;
            }, function (error) {
                console.log(error);
            });

        $scope.likePost = function (feed) {
            userData.likePost(feed.id)
                .then(function () {
                    console.log("Liked");
                    feed.likesCount++;
                    feed.liked = true;
                    console.log(feed.id);
                }, function (error) {
                    console.log(error);
                });
        };

        $scope.unlikePost = function (feed) {
            userData.unlikePost(feed.id)
                .then(function () {
                    feed.likesCount--;
                    feed.liked = false;
                }, function (error) {
                    console.log(error);
                });
        };

        $scope.likeComment = function (postId, comment) {
            userData.likeComment(postId, comment.id)
                .then(function () {
                    console.log("Liked");
                    comment.likesCount++;
                    comment.liked = true;
                    console.log(comment.id);
                }, function (error) {
                    console.log(error);
                });
        };

        $scope.unlikeComment = function (postId, comment) {
            userData.unlikeComment(postId, comment.id)
                .then(function () {
                    comment.likesCount--;
                    comment.liked = false;
                }, function (error) {
                    console.log(error);
                });
        };

        $scope.showComments = function () {
            $scope.isShowComment = true;
        };

        $scope.hideComments = function () {
            $scope.isShowComment = false;
        };

        $scope.isLiked = function (feed) {
            return !feed.liked;
        };
        $scope.isNotLiked = function (feed) {
            return feed.liked;
        }
});