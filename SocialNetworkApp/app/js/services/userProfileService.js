socialNetworkApp.factory('userProfileService',
    function userProfileService($http, $q, baseServiceUrl, authorizationService) {

        var serviceUrl = baseServiceUrl + 'users/';

        function userProfileRequester(method, url, data) {
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
            return userProfileRequester('GET', serviceUrl + userName, null);
        };

        var getPreviewUserProfile = function () {
            var userName = authorizationService.getUsername();
            return userProfileRequester('GET', serviceUrl + userName + '/preview', null);
        };

        var editUserProfile = function (data) {
            return userProfileRequester('PUT', baseServiceUrl + 'me', data);
        };

        var getMyProfileData = function () {
            return userProfileRequester('GET', baseServiceUrl + 'me', null);
        };

        var changeProfilePassword = function (data) {
            return userProfileRequester('PUT', baseServiceUrl + 'me/changepassword', data);
        };

        return {
            getFullUserProfile: getFullUserProfile,
            getPreviewUserProfile: getPreviewUserProfile,
            getMyProfileData: getMyProfileData,
            editUserProfile: editUserProfile,
            changeProfilePassword: changeProfilePassword
        }
});