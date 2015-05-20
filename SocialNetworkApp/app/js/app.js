var socialNetworkApp = angular.module('socialNetworkApp',['ngRoute']);//'ui.bootstrap', 'mgcrea.ngStrap', 'LiveSearch'
socialNetworkApp.config(['$routeProvider',
    function ($routeProvider) {
        //var routePermissions = {
        //    isLogged: {
        //        authenticate: function ($q, authorizationService) {
        //            if (authorizationService.isLogged() == true) {
        //                return true;
        //            } else {
        //                return $q.reject('not authorized');
        //            }
        //        }
        //    }
        //};
        //if (authorizationService.isLogged()) {
            $routeProvider
                .when('/logout', {
                    redirectTo: '/'

                })

                .when('/', {
                //templateUrl: 'templates/welcome.html'
                templateUrl: 'templates/mainPageTemplate.html',
                controller: 'navigationController'

            })
        //} else {
        //    $routeProvider.when('/', {
        //        //templateUrl: 'templates/welcome.html'
        //        templateUrl: 'templates/welcome.html'
        //
        //    });
        //}

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
                //.when('/logout', {
                //    //templateUrl: 'templates/welcome.html'
                //    templateUrl: 'templates/mainPageTemplate.html',
                //    controller: 'navigationController'
                //
                //})

        .otherwise({
            redirectTo: '/',
                    templateUrl: 'templates/mainPageTemplate.html',
                    controller: 'navigationController'
        });
    }]);
socialNetworkApp.constant('baseServiceUrl',  'http://softuni-social-network.azurewebsites.net/api/');
