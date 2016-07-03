socialNetworkApp.factory('requesterService', function ($http, $q, authorizationService) {

    function makeRequest(method, url, data) {
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

    return {
        makeRequest: makeRequest
    };
});