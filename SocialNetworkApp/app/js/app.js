var socialNetworkApp = angular.module('socialNetworkApp',
    ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'templates/welcome.html'
        });
        $routeProvider.when('/register', {
            templateUrl: 'templates/register.html'
        });
        $routeProvider.when('/login', {
            templateUrl: 'templates/login.html'
        });
        $routeProvider.when('/edit-profile', {
            templateUrl: 'templates/edit-profile.html',
        });
        $routeProvider.when('/change-password', {
            templateUrl: 'templates/change-password.html',
        })
        .otherwise({
            redirectTo: '/'
        });
    })
    .constant('baseServiceUrl',  'http://softuni-social-network.azurewebsites.net/api/');
