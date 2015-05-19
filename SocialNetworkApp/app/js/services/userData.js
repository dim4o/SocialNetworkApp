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

        var getOwnFriends = function () {
            return userDataRequester('GET', baseServiceUrl + 'me/friends', null)
        };

        var getNewsFeedsPages = function () {
            return userDataRequester('GET', baseServiceUrl + 'me/feed?StartPostId=&PageSize=5', null)
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
        
        //var addCommentToPost = function (postId) {
        //    return userDataRequester('POST', baseServiceUrl + 'Posts/' +
        //        postId + '/comments', null);
        //};



        return {
            register: register,
            login: login,
            logout: logout,
            searchUserByName: searchUserByName,
            getOwnFriends: getOwnFriends,
            getNewsFeedsPages: getNewsFeedsPages,
            likePost: likePost,
            unlikePost: unlikePost,
            likeComment: likeComment,
            unlikeComment: unlikeComment,
            getFriendRequests: getFriendRequests
            //addCommentToPost: addCommentToPost
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
