socialNetworkApp.controller('postsController',
    function postController($scope, postsService, $routeParams, notificationService) {

        console.log('Post Controller Initialization');

        $scope.limit = 1000;
        //$scope.showEditDialog = false;
        //$scope.showEditArea = false;
        //$scope.postsData = {};

        $scope.likePost = function (feed) {
            postsService.likePost(feed.id)
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
            postsService.unlikePost(feed.id)
                .then(function () {
                    feed.likesCount--;
                    feed.liked = false;
                }, function (error) {
                    console.log(error);
                });
        };

        $scope.likeComment = function (postId, comment) {
            postsService.likeComment(postId, comment.id)
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
            postsService.unlikeComment(postId, comment.id)
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

            postsService.getPostComments(feed.id)
                .then(function (allCommentsData) {
                    $scope.allPostComments = [];
                    //$scope.allPostComments = allCommentsData;
                    $scope.isShowAllpostComments = true;
                    $scope.limit = 1000;
                    //console.log(allPostComments);
                    $scope.postsData[i]['comments'] = allCommentsData;
                    $scope.allPostComments.forEach(function (comment) {
                        console.log(comment.commentContent);
                    });

                }, function (error) {
                    console.log(error);
                });
        };

        $scope.addNewPost = function (content) {
            postsService.addNewPost($scope.currentUsername, content)
                .then(function (post) {
                    notificationService.success('Success', 'Post successfully added.');
                    $scope.postsData.unshift(post);
                }, function (error) {
                    notificationService.error('Error', 'Failed to add post.');
                    console.log(error);
                });
        };

        $scope.showLessComments = function () {
            $scope.limit = 3;
            alert('Less');
        };

        $scope.addCommentToPost = function (feed, i, comment) {
            postsService.addCommentToPost(feed.id, comment)
                .then(function (commentData) {
                    console.log(commentData);
                    $scope.postsData[i]['comments'].unshift(commentData);
                    notificationService.success('Success', 'Comment successfully added.');
                }, function (error) {
                    notificationService.success('Error', 'Failed to add comment.');
                    console.log(error);
                });
        };

        $scope.editComment = function (postId, commentId, postIndex, commentIndex, comment) {
            console.log(postId);
            console.log(commentId);
            postsService.editComment(postId, commentId, comment)
                .then(function (commentData) {
                    console.log(commentData);
                    $scope.postsData[postIndex]['comments'][commentIndex].commentContent = comment;
                    notificationService.success('Success', 'Comment successfully edited.');
                }, function (error) {
                    console.log(error);
                    notificationService.error('Error', 'Failed to edit comment.');
                });
        };

        $scope.deleteComment = function (postId, commentId, postIndex, commentIndex) {
            console.log(postId);
            console.log(commentId);
            postsService.deleteComment(postId, commentId)
                .then(function () {
                    $scope.postsData[postIndex]['comments'].splice(commentIndex, 1);
                    notificationService.success('Success', 'Comment successfully deleted.');
                }, function (error) {
                    notificationService.error('Error', 'Failed to delete comment.')
                    console.log(error);
                });
        };

        $scope.deletePost = function (post, i) {
            postsService.deletePost(post.id)
                .then(function () {
                    $scope.postsData.splice(i, 1);
                    notificationService.success('Success', 'Post successfully deleted.');
                }, function (error) {
                    notificationService.error('Error', 'Failed to delete post.')
                    console.log(error);
                });
        };

        $scope.getPostPreviewLikes = function (postId) {
            postsService.getPostPreviewLikes(postId)
                .then(function (likesPreviewData) {
                    console.log(likesPreviewData);
                    $scope.likesPreviewData = likesPreviewData;
                }, function (error) {
                    console.log(error);
                })
        }

        //$(document).ready(function(){
        //    $('[data-toggle="popover"]').popover();
        //});



        $scope.isMyOwnWall = function () {
            return !$routeParams.username;
        };

        $scope.myUsername = function () {
            return sessionStorage['username'];
        };

        $scope.toLocalTimeZone = function(item){
            item.date = new Date(item.date);
        };

        $scope.click = function () {
            alert('AAAAAAa');
        };

    });