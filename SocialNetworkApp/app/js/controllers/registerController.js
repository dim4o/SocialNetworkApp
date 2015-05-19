(function () {
    "use strict";

    socialNetworkApp.controller('registerController',
        function registerController($scope, $location, userData) {
            $scope.register = function (user) {
                userData.register(user).then(function () {
                    //notifier.success('Registration successful!Please login.');
                    $location.path('/');
                }, function (response) {
                    //var errors = response['modelState'][''];
                    //errors.forEach(function (error) {
                    //    //notifier.error(error);
                    //    console.log(error);
                    //});
                })
            };
            //$scope.a = 'fsdfsdfsdfsdfsdfsd';
            //$scope.user = {
            //    gender: 'Male'
            //};
        });


}());
