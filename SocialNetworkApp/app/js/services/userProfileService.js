socialNetworkApp.factory('userProfileService',
    function userProfileService($http, $q, baseServiceUrl, authorizationService) {

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

        var getFullUserProfile = function () {
            var userName = authorizationService.getUsername();
            return userDataRequester('GET', serviceUrl + userName, null);
        };

        var getPreviewUserProfile = function () {
            var userName = authorizationService.getUsername();
            return userDataRequester('GET', serviceUrl + userName + '/preview', null);
        };

        var editUserProfile = function (data) {
            return userDataRequester('PUT', baseServiceUrl + 'me', data);
        };

        var getMyProfileData = function () {
            return userDataRequester('GET', baseServiceUrl + 'me', null);
        };

        var changeProfilePassword = function (data) {
            return userDataRequester('PUT', baseServiceUrl + 'me/changepassword', data);
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

        var sendFriendRequest = function (username) {
            return userDataRequester('POST', baseServiceUrl + 'me/requests/' + username, null)
        };

        var getMyFriendsPreview = function () {
            return userDataRequester('GET', baseServiceUrl + 'me/friends/preview', null)
        };


        var getUserPreviewData = function (username) {
            return userDataRequester('GET', baseServiceUrl + 'users/' + username +
                '/preview', null)
        };

        var getNewsFeedsPages = function (startPostId, pageSize) {
            if (!startPostId) {
                startPostId = '';
            }
            return userDataRequester('GET', baseServiceUrl +
                'me/feed?StartPostId=' + startPostId + '&PageSize=' + pageSize, null)
        };

        var getOwnFriends = function () {
            return userDataRequester('GET', baseServiceUrl + 'me/friends', null)
        };

        return {
            getFullUserProfile: getFullUserProfile,
            getPreviewUserProfile: getPreviewUserProfile,
            getMyProfileData: getMyProfileData,
            editUserProfile: editUserProfile,
            changeProfilePassword: changeProfilePassword,
            getFriendRequests: getFriendRequests,
            approveFriendRequest: approveFriendRequest,
            rejectFriendRequest: rejectFriendRequest,
            sendFriendRequest: sendFriendRequest,
            getUserPreviewData: getUserPreviewData,
            getMyFriendsPreview: getMyFriendsPreview,
            getNewsFeedsPages: getNewsFeedsPages,
            getOwnFriends: getOwnFriends
        }
});