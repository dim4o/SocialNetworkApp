socialNetworkApp.controller('postsController',
    function postController($scope, $rootScope, postsService, $routeParams,
                            notificationService, authorizationService,
                            PROFILE_IMAGE_PREVIEW) {

        $scope.defaultProfileImagePreview = PROFILE_IMAGE_PREVIEW;

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

        $scope.addNewPost = function (content, username) {

            postsService.addNewPost(username, content)
                .then(function (post) {
                    notificationService.success('Success', 'Post successfully added.');
                    $scope.postsData.unshift(post);

                    $rootScope.sidebar = {
                        show  : true
                    }
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
                    $scope.postsData[i].totalCommentsCount++;
                    notificationService.success('Success', 'Comment successfully added.');
                }, function (error) {
                    notificationService.error('Error', 'Failed to add comment.');
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
                    $scope.postsData[postIndex].totalCommentsCount--;
                    notificationService.success('Success', 'Comment successfully deleted.');
                }, function (error) {
                    notificationService.error('Error', 'Failed to delete comment.')
                    console.log(error);
                });
        };

        $scope.deletePost = function (post, i) {
            $scope.likesPreviewData = {};
            $scope.likesPreviewData.postLikes = {};
            //$scope.likesPreviewData.commentLikes = {};

            postsService.deletePost(post.id)
                .then(function () {
                    $scope.postsData.splice(i, 1);
                    notificationService.success('Success', 'Post successfully deleted.');
                }, function (error) {
                    notificationService.error('Error', 'Failed to delete post.')
                    console.log(error);
                });
        };

        $scope.editPost = function (postId, postIndex, content) {
            postsService.editPost(postId, content)
                .then(function (success) {
                    $scope.postsData[postIndex].postContent = content;
                    notificationService.success('Success', 'Post successfully edited.');
                }, function (error) {
                    notificationService.error('Error', 'Failed to edit post.');
                    console.log(error);
                });
        };

        $scope.getPostPreviewLikes = function (postId) {
            $scope.likesPreviewData = {};
            //$scope.likesPreviewData.postLikes = {};
            $scope.likesPreviewData.commentLikes = {};

            postsService.getPostPreviewLikes(postId)
                .then(function (postLikesPreviewData) {
                    console.log(postLikesPreviewData);
                    $scope.likesPreviewData = postLikesPreviewData;
                }, function (error) {
                    console.log(error);
                })
        };

        $scope.getCommentPreviewLikes = function (postId, commentId) {
            postsService.getCommentPreviewLikes(postId, commentId)
                .then(function (commentLikesPreviewData) {
                    console.log(commentLikesPreviewData);
                    $scope.likesPreviewData = commentLikesPreviewData;
                }, function (error) {
                    console.log(error);
                })
        };

        // Authorizations for: delete, like/unlike and comment buttons
        $scope.isMyNewsFeed = function () {
            return !$routeParams.username;
        };

        $scope.isMyOwnWall = function () {
            return $routeParams.username == authorizationService.getUsername() ;
        };

        $scope.myUsername = function () {
            return authorizationService.getUsername();
        };

        $scope.toLocalTimeZone = function(item){
            item.date = new Date(item.date);
        };
    });