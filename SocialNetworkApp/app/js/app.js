var socialNetworkApp = angular.module('socialNetworkApp',
    ['ngRoute', 'ngAnimate', 'toaster', 'infinite-scroll', 'cgBusy', 'angularSpinner']);//'ui.bootstrap', 'mgcrea.ngStrap', 'LiveSearch'

socialNetworkApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            //.when('/logout', {
            //    redirectTo: '/'
            //})
            .when('/', {
                //templateUrl: 'templates/welcome.html'
                templateUrl: 'templates/mainPageTemplate.html',
                controller: 'navigationController'
            })
            .when('/register', {
                templateUrl: 'templates/register.html',
                controller: 'registerController'
            })
            .when('/login', {
                templateUrl: 'templates/login.html',
                controller: 'loginController'
            })
            .when('/edit-profile', {
                templateUrl: 'templates/edit-profile.html',
                controller: 'editProfileController'
            })
            .when('/change-password', {
                templateUrl: 'templates/change-password.html',
                controller: 'changePasswordController'
            })
            .when('/users/:username/friends', {
                templateUrl: 'templates/friendsPageTemplate.html',
                controller: 'friendsController'
            })
            .when('/users/:username', {
                templateUrl: 'templates/user-wall.html',
                controller: 'userWallController'
            })
            .otherwise({
                redirectTo: '/',
                templateUrl: 'templates/mainPageTemplate.html',
                controller: 'navigationController'
            });
    }]);

// Authorization check: anonymous site visitors cannot access user routes
socialNetworkApp.run(function ($rootScope, $location, authorizationService) {
    $rootScope.$on('$locationChangeStart', function (event) {
        if ($location.path().indexOf("/login") == -1 &&
            $location.path().indexOf("/register") == -1 &&
            $location.path().indexOf("/logout") == -1
            && !authorizationService.isLogged()
            ) {
            $location.path("/");
        }
    });
});

socialNetworkApp.config(['usSpinnerConfigProvider', function (usSpinnerConfigProvider) {
    usSpinnerConfigProvider.setDefaults(
        {
            color: '#18BC9C',
            position: 'fixed',
            length: 0,
            lines: 7,
            width: 25,
            radius: 30
        });
}]);

socialNetworkApp.constant({
    BASE_URL: 'http://softuni-social-network.azurewebsites.net/api/',
    REFRESH_INTERVAL: 1740000,
    PAGE_SIZE: 5,
    PROFILE_IMAGE_PREVIEW: './img/defaultProfileImagePreview.png'
});

