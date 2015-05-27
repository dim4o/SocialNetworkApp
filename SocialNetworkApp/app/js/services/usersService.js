socialNetworkApp.factory('usersService', usersService);

function usersService($http, $q, baseServiceUrl, authorizationService) {

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


    // TODO: delete
    var register = function (registerData) {
        return userDataRequester('POST', serviceUrl + 'register', registerData);
    };

    // TODO: delete
    var login = function (loginData) {
        return userDataRequester('POST', serviceUrl + 'login', loginData);
    };

    // TODO: delete
    var logout = function () {
        return userDataRequester('POST', serviceUrl + 'logout', null);
    };

    // TODO: delete
    var searchUserByName = function (name) {
        return userDataRequester('GET', serviceUrl + 'search?searchTerm=' + name, null);
    };

    var getFullUserProfile = function () {
        var userName = authorizationService.getUsername();
        return userDataRequester('GET', serviceUrl + userName, null);
    };

    var getPreviewUserProfile = function () {
        var userName = authorizationService.getUsername();
        return userDataRequester('GET', serviceUrl + userName + '/preview', null);
    };

    var getUserFullData = function (username) {
        return userDataRequester('GET', serviceUrl + username, null);
    };

    var getUserPreviewData = function (username) {
        return userDataRequester('GET', serviceUrl + username +
            '/preview', null)
    };

    var getFriendsFriendsPreview = function (friendsUsername) {
        return userDataRequester('GET', serviceUrl +
            friendsUsername +'/friends/preview')
    };

    var getDetailedFriendsFriendsList = function (friendsUsername) {
        return userDataRequester('GET', serviceUrl +
            friendsUsername +'/friends')
    };

    // TODO: delete
    var getFriendWallByPages = function (username) {
        return userDataRequester('GET', baseServiceUrl +
            'users/' + username+ '/wall?StartPostId=&PageSize=10', null);
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