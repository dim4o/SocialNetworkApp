socialNetworkApp.controller('postsController',
    function postController($scope, userData, $routeParams) {
        $scope.limit = 1000;

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
                    $scope.postsData[i]['comments'] = allCommentsData;
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

        $scope.addCommentToPost = function (feed, i, comment) {
            console.log(comment);
            userData.addCommentToPost(feed.id, comment)
                .then(function (commentData) {
                    $scope.postsData[i]['comments'].unshift(commentData);
                    console.log(comment);
                }, function (error) {
                    console.log(error);
                });
        };

        $scope.deleteComment = function (postId, commentId, postIndex, commentIndex) {
            console.log(postId);
            console.log(commentId);
            userData.deleteComment(postId, commentId)
                .then(function () {
                    $scope.postsData[postIndex]['comments'].splice(commentIndex, 1);
                }, function (error) {
                    console.log(error);
                });
        };

        $scope.deletePost = function (post, i) {
            userData.deletePost(post.id)
                .then(function () {
                    $scope.postsData.splice(i, 1);
                }, function (error) {
                    console.log(error);
                });
        };

        //$(document).ready(function(){
        //    $('[data-toggle="popover"]').popover();
        //});

        $scope.editComment = function (postId, commentId, comment, i) {
            console.log(postId);
            console.log(commentId);
            userData.editComment(postId, commentId, comment)
                .then(function () {
                    $scope.postsData[i]['comments'].splice(i, 1);
                }, function (error) {
                    console.log(error);
                });
        };

        $scope.isMyOwnWall = function () {
            return !$routeParams.username;
        };

        $scope.myUsername = function () {
            return sessionStorage['username'];
        }

        $scope.toLocalTimeZone = function(item){
            item.date = new Date(item.date);
        };
    });