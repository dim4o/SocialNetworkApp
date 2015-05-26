(function () {
    'use strict';

    socialNetworkApp.factory('userData', userData);
    function userData($http, $q, baseServiceUrl, authorizationService) {
        var serviceUrl = baseServiceUrl + 'users/';

        function userDataRequester(method, url, data) {
            var deferred = $q.defer();
            var headers = {
                Authorization: 'Bearer ' + authorizationService.getAccessToken()
            };
            //if () {
            //
            //}

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

        var register = function (registerData) {
            return userDataRequester('POST', serviceUrl + 'register', registerData);
        };

        var login = function (loginData) {
            return userDataRequester('POST', serviceUrl + 'login', loginData);
        };

        var logout = function () {
            return userDataRequester('POST', serviceUrl + 'logout', null);
        };

        var searchUserByName = function (name) {
            return userDataRequester('GET', serviceUrl + 'search?searchTerm=' + name, null);
        };

        var getMyFriendsPreview = function () {
            return userDataRequester('GET', baseServiceUrl + 'me/friends/preview', null)
        };

        var getOwnFriends = function () {
            return userDataRequester('GET', baseServiceUrl + 'me/friends', null)
        };

        var getNewsFeedsPages = function () {
            return userDataRequester('GET', baseServiceUrl + 'me/feed?StartPostId=&PageSize=10', null)
        };

        var likePost = function (postId) {
            return userDataRequester('POST', baseServiceUrl + 'Posts/' +
                postId + '/likes', null);
        };

        var unlikePost = function (postId) {
            return userDataRequester('DELETE', baseServiceUrl + 'Posts/' +
                postId + '/likes', null);
        };

        var likeComment = function (postId, commentId) {
            return userDataRequester('POST', baseServiceUrl + 'posts/' +
                postId + '/comments/' + commentId + '/likes', null);
        };

        var unlikeComment = function (postId, commentId) {
            return userDataRequester('DELETE', baseServiceUrl + 'posts/' +
                postId + '/comments/' + commentId + '/likes', null);
        };

        var getFriendRequests = function () {
            return userDataRequester('GET', baseServiceUrl + 'me/requests', null)
        };

        var approveFriendRequest = function (requestId) {
            return userDataRequester('PUT', baseServiceUrl
                + 'me/requests/' + requestId + '?status=approved')
        };

        var rejectFriendRequest = function (requestId) {
            return userDataRequester('PUT', baseServiceUrl
                + 'me/requests/' + requestId + '?status=rejected')
        };

        var getPostComments = function (postId) {
            return userDataRequester('GET', baseServiceUrl + 'posts/' + postId + '/comments')
        };
        
        var addCommentToPost = function (postId, comment) {
            var data = {commentContent: comment};
            return userDataRequester('POST', baseServiceUrl +
                'posts/' + postId + '/comments', data);
        };

        var deleteComment = function (postId, commentId) {
            return userDataRequester('DELETE', baseServiceUrl +
                'posts/' + postId + '/comments/' + commentId, null);
        };

        var editComment = function (postId, commentId, comment) {
            var data = {commentContent: comment};
            return userDataRequester('PUT', baseServiceUrl +
                'posts/' + postId + '/comments/' + commentId, data);
        };

        var getFriendWallByPages = function (username) {
            return userDataRequester('GET', baseServiceUrl +
                'users/' + username+ '/wall?StartPostId=&PageSize=10', null);
        };
        
        var addNewPost = function (username, content) {
            var data = {
                postContent: content,
                username: username
            };
            return userDataRequester('POST', baseServiceUrl + 'posts', data)
        };

        var deletePost = function (postId) {
            return userDataRequester('DELETE', baseServiceUrl + 'Posts/' + postId, null);
        };

        var getUserFullData = function (username) {
            return userDataRequester('GET', baseServiceUrl + 'users/' + username, null);
        };

        var getUserPreviewData = function (username) {
            return userDataRequester('GET', baseServiceUrl + 'users/' + username +
                '/preview', null)
        };

        var sendFriendRequest = function (username) {
            return userDataRequester('POST', baseServiceUrl + 'me/requests/' + username, null)
        };

        var getFriendsFriendsPreview = function (friendsUsername) {
            return userDataRequester('GET', baseServiceUrl + 'users/'+
                friendsUsername +'/friends/preview')
        };

        var getDetailedFriendsFriendsList = function (friendsUsername) {
            return userDataRequester('GET', baseServiceUrl + 'users/'+
                friendsUsername +'/friends')
        };



        return {
            register: register,
            login: login,
            logout: logout,
            searchUserByName: searchUserByName,
            getMyFriendsPreview: getMyFriendsPreview,
            getOwnFriends: getOwnFriends,
            getNewsFeedsPages: getNewsFeedsPages,
            likePost: likePost,
            unlikePost: unlikePost,
            likeComment: likeComment,
            unlikeComment: unlikeComment,
            getFriendRequests: getFriendRequests,
            approveFriendRequest: approveFriendRequest,
            rejectFriendRequest: rejectFriendRequest,
            getPostComments: getPostComments,
            addCommentToPost: addCommentToPost,
            deleteComment: deleteComment,
            editComment: editComment,
            getFriendWallByPages: getFriendWallByPages,
            addNewPost: addNewPost,
            deletePost: deletePost,
            getUserFullData: getUserFullData,
            getUserPreviewData: getUserPreviewData,
            sendFriendRequest: sendFriendRequest,
            getFriendsFriendsPreview: getFriendsFriendsPreview,
            getDetailedFriendsFriendsList: getDetailedFriendsFriendsList
        };
        ////userData.$inject = ['$http', '$q', 'baseServiceUrl', 'userIdentity', 'authorization'];
        //
        //var usersApi = baseServiceUrl + 'users/';
        //
        //return {
        //    register: function (user) {
        //        var deferred = $q.defer();
        //
        //        $http.post(usersApi + 'register', user)
        //            .success(function () {
        //                deferred.resolve();
        //            })
        //            .error(function (response) {
        //                deferred.reject(response);
        //            });
        //
        //        return deferred.promise;
        //    },
        //    login: function (user) {
        //        var deferred = $q.defer();
        //
        //        $http.post(usersApi + '/login', user)
        //            .success(function (response) {
        //                if (response['access_token']) {
        //                    authorizationService.setUserData(response);
        //                    //userIdentity.setCurrentUser(response);
        //                    //authorization.setAuthorizationHeader(response['access_token']);
        //                    deferred.resolve(true);
        //                }
        //            })
        //            .error(function (data, status) {
        //                //console.error('Login error !!!', status, data);
        //                deferred.reject(data["error_description"]);
        //            });
        //
        //        return deferred.promise;
        //    },
        //    logout: function () {
        //        var deferred = $q.defer();
        //
        //        var headers = {
        //            Authorization: 'Bearer ' + authorizationService.getAccessToken()
        //        };
        //        $http.post(usersApi + 'logout', {}, {headers: headers})
        //            .success(function () {
        //                //userIdentity.setCurrentUser(undefined);
        //               // authorization.removeAuthorizationHeader();
        //                deferred.resolve();
        //            });
        //
        //        return deferred.promise;
        //
        //    }
        //}
    }
})();
