socialNetworkApp.factory('postsService', postsService);

function postsService($http, $q, baseServiceUrl, authorizationService) {
    var serviceUrl = baseServiceUrl + 'posts/';

    function userDataRequester(method, url, data) {
        var deferred = $q.defer();
        var headers = {
            Authorization: 'Bearer ' + authorizationService.getAccessToken()
        };

        $http({
            method: method,
            url: url,
            headers: headers,
            data: data
        })
            .success(function (data, status, headers, config) {
                deferred.resolve(data, status, headers, config);
            })
            .error(function (data, status, headers, config) {
                deferred.reject(data, status, headers, config);
            });

        return deferred.promise;
    }

    // Posts services
    var addNewPost = function (username, content) {
        var data = {
            postContent: content,
            username: username
        };
        return userDataRequester('POST', serviceUrl, data)
    };

    var deletePost = function (postId) {
        return userDataRequester('DELETE', serviceUrl + postId, null);
    };

    var likePost = function (postId) {
        return userDataRequester('POST', serviceUrl + postId + '/likes', null);
    };

    var unlikePost = function (postId) {
        return userDataRequester('DELETE', serviceUrl + postId + '/likes', null);
    };

    // Posts/Comments services
    var addCommentToPost = function (postId, comment) {
        var data = {commentContent: comment};
        return userDataRequester('POST', serviceUrl + postId +
            '/comments', data);
    };

    var editComment = function (postId, commentId, comment) {
        var data = {commentContent: comment};
        return userDataRequester('PUT', serviceUrl + postId +
            '/comments/' + commentId, data);
    };

    var deleteComment = function (postId, commentId) {
        return userDataRequester('DELETE', serviceUrl + postId +
            '/comments/' + commentId, null);
    };

    var likeComment = function (postId, commentId) {
        return userDataRequester('POST', serviceUrl + postId +
            '/comments/' + commentId + '/likes', null);
    };

    var unlikeComment = function (postId, commentId) {
        return userDataRequester('DELETE', serviceUrl + postId +
            '/comments/' + commentId + '/likes', null);
    };

    var getPostComments = function (postId) {
        return userDataRequester('GET', serviceUrl + postId + '/comments')
    };
    
    var getPostPreviewLikes = function (postId) {
        return userDataRequester('GET', serviceUrl + postId + '/likes/preview');
    };

    return {
        addNewPost: addNewPost,
        deletePost: deletePost,
        likePost: likePost,
        unlikePost: unlikePost,
        addCommentToPost: addCommentToPost,
        editComment: editComment,
        deleteComment: deleteComment,
        likeComment: likeComment,
        unlikeComment: unlikeComment,
        getPostComments: getPostComments,
        getPostPreviewLikes: getPostPreviewLikes
    }
}