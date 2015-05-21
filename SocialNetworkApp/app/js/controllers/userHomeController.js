socialNetworkApp.controller('userHomeController',
    function userHomeController($scope, userData) {
        $scope.myFriendsData = {};

        userData.getMyFriendsPreview()
            .then(function (ownFriendsPreviewData) {
                //ownFriendsPreviewData.friends.forEach(function (friend) {
                //    if (!friend.profileImageData) {
                //        friend.profileImageData = './img/defaultProfileImage.png';
                //    }
                //});
                for (var i = 0; i < ownFriendsPreviewData.friends.length; i++) {
                    if (!ownFriendsPreviewData.friends[i].profileImageData) {
                        ownFriendsPreviewData.friends[i].profileImageData = './img/defaultProfileImage.png';
                    }
                }
                $scope.myFriendsData = ownFriendsPreviewData;
            }, function (error) {
                console.log(error);
            });

        userData.getNewsFeedsPages()
            .then(function (newsFeedsData) {
                $scope.newsFeedsData = newsFeedsData;
                $scope.limit = 1000;
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

        $scope.isShowAllpostComments = false;

        $scope.isLiked = function (feed) {
            return !feed.liked;
        };
        $scope.isNotLiked = function (feed) {
            return feed.liked;
        };

        $scope.showMoreComments = function (feed, i) {
            console.log(feed.id);

            userData.getPostComments(feed.id)
                .then(function (allCommentsData) {
                    $scope.allPostComments = [];
                    //$scope.allPostComments = allCommentsData;
                    $scope.isShowAllpostComments = true;
                    $scope.limit = 1000;
                    //console.log(allPostComments);
                    $scope.newsFeedsData[i]['comments'] = allCommentsData;
                    $scope.allPostComments.forEach(function (comment) {
                        console.log(comment.commentContent);
                    })


                }, function (error) {
                    console.log(error);
                });
        };

        $scope.showLessComments = function () {
            $scope.limit = 3;
            alert('Less');
        };

        $scope.popupPersonPreview = function () {
            $scope.showPopup = null;
            $scope.showPopup = true;
        };

        $scope.hidePopupPreview = function () {
            $scope.showPopup = null;
            $scope.showPopup = false;
        };

        $scope.addCommentToPost = function (feed, i, comment) {
            console.log(comment);
            userData.addCommentToPost(feed.id, comment)
                .then(function () {
                    $scope.newsFeedsData[i]['comments'].unshift(comment);
                    console.log(comment);
                }, function (error) {
                    console.log(error);
                });
        };

        $scope.deleteComment = function (postId, commentId, i) {
            console.log(postId);
            console.log(commentId);
            userData.deleteComment(postId, commentId)
                .then(function () {
                    $scope.newsFeedsData[i]['comments'].splice(i, 1);
                }, function (error) {
                    console.log(error);
                });
        }
});