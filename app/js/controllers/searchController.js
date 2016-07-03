socialNetworkApp.controller('searchController',
    function searchController($scope, usersService, PROFILE_IMAGE_PREVIEW) {
        $scope.users = {};
        $scope.defaultProfileImagePreview = PROFILE_IMAGE_PREVIEW;

        $scope.search = function search(name) {
            //alert('Cliced');
            if (name !== "") {
                usersService.searchUserByName(name)
                    .then(function (users) {
                        $scope.users = users;
                        //users.forEach(function (user) {
                        //    if (!user.profileImageData) {
                        //        user.profileImageData = './img/defaultProfileImage.png';
                        //    }
                        //})
                    }, function (error) {
                        $scope.users = {};
                        console.log(error);
                    });
            } else {
                $scope.users = {};
            }

        };

        $scope.users = {};
    });