var socialNetworkApp = angular.module('socialNetworkApp',
    ['ngRoute'])//'ui.bootstrap', 'mgcrea.ngStrap', 'LiveSearch'
    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            //templateUrl: 'templates/welcome.html'
            templateUrl: 'templates/news-feed.html',
            controller: 'userHomeController'
        });
        $routeProvider.when('/register', {
            templateUrl: 'templates/register.html',
            controller: 'registerController'
        });
        $routeProvider.when('/login', {
            templateUrl: 'templates/login.html',
            controller: 'loginController'
        });
        $routeProvider.when('/edit-profile', {
            templateUrl: 'templates/edit-profile.html',
            controller: 'editProfileController'
        });
        $routeProvider.when('/change-password', {
            templateUrl: 'templates/change-password.html',
            controller: 'changePasswordController'
        })
        .otherwise({
            redirectTo: '/'
        });
    })
    .constant('baseServiceUrl',  'http://softuni-social-network.azurewebsites.net/api/');
