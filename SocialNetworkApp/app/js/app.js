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

socialNetworkApp.constant('baseServiceUrl',  'http://softuni-social-network.azurewebsites.net/api/');

//socialNetworkApp.animation('.hide-animation', function () {
//    return {
//        beforeAddClass : function(element, className, done) {
//            if (className === 'ng-hide') {
//                element.animate({
//                    opacity: 0
//                },500, done);
//            } else {
//                done();
//            }
//        },
//        removeClass : function(element, className, done) {
//            if (className === 'ng-hide') {
//                element.css('opacity',0);
//                element.animate({
//                    opacity: 1
//                }, 500, done);
//            } else {
//                done();
//            }
//        }
//    };
//});
