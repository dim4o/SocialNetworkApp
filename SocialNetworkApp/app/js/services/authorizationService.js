socialNetworkApp.factory('authorizationService', authorizationService);

function authorizationService($window) {
    function setAccessToken(userData) {
        $window.sessionStorage.setItem('access_token', userData.access_token)
    }

    function getAccessToken() {
        if ($window.sessionStorage.getItem('access_token')) {
           return $window.sessionStorage.getItem('access_token');
        }
    }

    function getUsername() {
        if ($window.sessionStorage.getItem('username')) {
            return $window.sessionStorage.getItem('username');
        }
    }

    function setUsername(username) {
        $window.sessionStorage.setItem('username', username);
    }

    function cleanSessionStorage() {
        $window.sessionStorage.clear();
    }

    function isLogged() {
        return !!getAccessToken();
    }

    function setUserData(userData) {
        var userJsonData = JSON.stringify(userData);
        $window.sessionStorage.setItem('userData', userJsonData);
    }

    function getUserData() {
        return JSON.parse($window.sessionStorage.getItem('userData'));
    }

    return {
        setAccessToken: setAccessToken,
        getAccessToken: getAccessToken,
        getUsername: getUsername,
        setUsername :setUsername,
        setUserData: setUserData,
        getUserData: getUserData,
        cleanSessionStorage: cleanSessionStorage,
        isLogged: isLogged
    }
}