socialNetworkApp.factory('usersService', usersService);

function usersService(requesterService, authorizationService, BASE_URL) {

    var serviceUrl = BASE_URL + 'users/';

    var register = function (registerData) {
        return requesterService.makeRequest('POST', serviceUrl + 'register', registerData);
    };

    var login = function (loginData) {
        return requesterService.makeRequest('POST', serviceUrl + 'login', loginData);
    };

    var logout = function () {
        return requesterService.makeRequest('POST', serviceUrl + 'logout', null);
    };

    var searchUserByName = function (name) {
        return requesterService.makeRequest('GET', serviceUrl + 'search?searchTerm=' + name, null);
    };

    var getFullUserProfile = function () {
        var userName = authorizationService.getUsername();
        return requesterService.makeRequest('GET', serviceUrl + userName, null);
    };

    var getPreviewUserProfile = function () {
        var userName = authorizationService.getUsername();
        return requesterService.makeRequest('GET', serviceUrl + userName + '/preview', null);
    };

    var getUserFullData = function (username) {
        return requesterService.makeRequest('GET', serviceUrl + username, null);
    };

    var getUserPreviewData = function (username) {
        return requesterService.makeRequest('GET', serviceUrl + username +
            '/preview', null)
    };

    var getFriendsFriendsPreview = function (friendsUsername) {
        return requesterService.makeRequest('GET', serviceUrl +
            friendsUsername +'/friends/preview')
    };

    var getDetailedFriendsFriendsList = function (friendsUsername) {
        return requesterService.makeRequest('GET', serviceUrl +
            friendsUsername +'/friends')
    };

    var getFriendWallByPages = function (username, startPostId, pageSize) {
        if (!startPostId) {
            startPostId = '';
        }
        return requesterService.makeRequest('GET', BASE_URL +
            'users/' + username+ '/wall?StartPostId=' + startPostId + '&PageSize='
            + pageSize, null);
    };

    return {
        register: register,
        login: login,
        logout: logout,
        searchUserByName: searchUserByName,
        getFullUserProfile: getFullUserProfile,
        getPreviewUserProfile: getPreviewUserProfile,
        getUserFullData: getUserFullData,
        getUserPreviewData: getUserPreviewData,
        getFriendsFriendsPreview: getFriendsFriendsPreview,
        getDetailedFriendsFriendsList: getDetailedFriendsFriendsList,
        getFriendWallByPages: getFriendWallByPages
    }
}