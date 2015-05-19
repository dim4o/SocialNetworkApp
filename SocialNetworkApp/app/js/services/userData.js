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

        return {
            register: register,
            login: login,
            logout: logout
        };
    }
})();
