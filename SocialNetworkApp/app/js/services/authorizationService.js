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
        if ($window.sessionStorage.getItem('username')) {
            return $window.sessionStorage.getItem('username');
        }
    }

    function cleanSessionStorage() {
        $window.sessionStorage.clear();
    }

    function isLogged() {
        console.log('Call: authService: getAccessToken()');
        return !!getAccessToken();
    }

    return {
        setAccessToken: setAccessToken,
        getAccessToken: getAccessToken,
        getUsername: getUsername,
        cleanSessionStorage: cleanSessionStorage,
        isLogged: isLogged
    }
}