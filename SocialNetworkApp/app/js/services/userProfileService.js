socialNetworkApp.factory('userProfileService',
    function userProfileService(requesterService, BASE_URL) {

        var  serviceUrl = BASE_URL + 'me';

        var editUserProfile = function (data) {
            return requesterService.makeRequest('PUT', serviceUrl, data);
        };

        var getMyProfileData = function () {
            return requesterService.makeRequest('GET', serviceUrl, null);
        };

        var changeProfilePassword = function (data) {
            return requesterService.makeRequest('PUT', serviceUrl + '/changepassword', data);
        };

        var getFriendRequests = function () {
            return requesterService.makeRequest('GET', serviceUrl + '/requests', null)
        };

        var approveFriendRequest = function (requestId) {
            return requesterService.makeRequest('PUT', serviceUrl
                + '/requests/' + requestId + '?status=approved')
        };

        var rejectFriendRequest = function (requestId) {
            return requesterService.makeRequest('PUT', serviceUrl
                + '/requests/' + requestId + '?status=rejected')
        };

        var sendFriendRequest = function (username) {
            return requesterService.makeRequest('POST', serviceUrl
                + '/requests/' + username, null)
        };

        var getMyFriendsPreview = function () {
            return requesterService.makeRequest('GET', serviceUrl
                + '/friends/preview', null)
        };

        var getNewsFeedsPages = function (startPostId, pageSize) {
            if (!startPostId) {
                startPostId = '';
            }
            return requesterService.makeRequest('GET', serviceUrl +
                '/feed?StartPostId=' + startPostId + '&PageSize=' + pageSize, null)
        };

        var getOwnFriends = function () {
            return requesterService.makeRequest('GET', serviceUrl + '/friends', null)
        };

        return {
            getMyProfileData: getMyProfileData,
            editUserProfile: editUserProfile,
            changeProfilePassword: changeProfilePassword,
            getFriendRequests: getFriendRequests,
            approveFriendRequest: approveFriendRequest,
            rejectFriendRequest: rejectFriendRequest,
            sendFriendRequest: sendFriendRequest,
            getMyFriendsPreview: getMyFriendsPreview,
            getNewsFeedsPages: getNewsFeedsPages,
            getOwnFriends: getOwnFriends
        }
});