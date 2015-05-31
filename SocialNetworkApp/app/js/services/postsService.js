socialNetworkApp.factory('postsService', postsService);

function postsService(requesterService, BASE_URL) {

    var serviceUrl = BASE_URL + 'posts/';

    // Posts services
    var addNewPost = function (username, content) {
        var data = {
            postContent: content,
            username: username
        };
        return requesterService.makeRequest('POST', serviceUrl, data)
    };

    var deletePost = function (postId) {
        return requesterService.makeRequest('DELETE', serviceUrl + postId, null);
    };

    var editPost = function (postId, comment) {
        var data = {postContent: comment};
        return requesterService.makeRequest('PUT', serviceUrl + postId, data);
    };

    var likePost = function (postId) {
        return requesterService.makeRequest('POST', serviceUrl + postId + '/likes', null);
    };

    var unlikePost = function (postId) {
        return requesterService.makeRequest('DELETE', serviceUrl + postId + '/likes', null);
    };

    // Posts/Comments services
    var addCommentToPost = function (postId, comment) {
        var data = {commentContent: comment};

        return requesterService.makeRequest('POST', serviceUrl + postId +
            '/comments', data);
    };

    var editComment = function (postId, commentId, comment) {
        var data = {commentContent: comment};

        return requesterService.makeRequest('PUT', serviceUrl + postId +
            '/comments/' + commentId, data);
    };

    var deleteComment = function (postId, commentId) {
        return requesterService.makeRequest('DELETE', serviceUrl + postId +
            '/comments/' + commentId, null);
    };

    var likeComment = function (postId, commentId) {
        return requesterService.makeRequest('POST', serviceUrl + postId +
            '/comments/' + commentId + '/likes', null);
    };

    var unlikeComment = function (postId, commentId) {
        return requesterService.makeRequest('DELETE', serviceUrl + postId +
            '/comments/' + commentId + '/likes', null);
    };

    var getPostComments = function (postId) {
        return requesterService.makeRequest('GET', serviceUrl + postId + '/comments')
    };
    
    var getPostPreviewLikes = function (postId) {
        return requesterService.makeRequest('GET', serviceUrl + postId + '/likes/preview');
    };

    var getCommentPreviewLikes = function (postId, commentId) {
        return requesterService.makeRequest('GET', serviceUrl + postId +
            '/comments/' + commentId + '/likes/preview');
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
        getPostPreviewLikes: getPostPreviewLikes,
        getCommentPreviewLikes: getCommentPreviewLikes,
        editPost: editPost
    }
}