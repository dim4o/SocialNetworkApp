socialNetworkApp.factory('authorizationService', authorizationService);

function authorizationService($window) {
    function setAccessToken(userData) {
        //$window.sessionStorage.setItem('userName', userData.userName);
        //$window.sessionStorage.setItem('email', userData.email);
        $window.sessionStorage.setItem('access_token', userData.access_token)
    }

    function getAccessToken() {
        if ($window.sessionStorage.getItem('access_token')) {
           return $window.sessionStorage.getItem('access_token');
        }
    }

    function getUsername() {
        if ($window.sessionStorage.getItem('userName')) {
            return $window.sessionStorage.getItem('userName');
        }
    }

    function cleanSessionStorage() {
        $window.sessionStorage.clear();
    }

    return {
        setAccessToken: setAccessToken,
        getAccessToken: getAccessToken,
        getUsername: getUsername,
        cleanSessionStorage: cleanSessionStorage
    }
}