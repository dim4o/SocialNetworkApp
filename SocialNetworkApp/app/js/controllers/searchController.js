socialNetworkApp.controller('searchController',
    function searchController($scope, userData) {
        $scope.users = {};

        $scope.search = function search(name) {
            //alert('Cliced');
            if (name !== "") {
                userData.searchUserByName(name)
                    .then(function (users) {
                        $scope.users = users;
                        users.forEach(function (user) {
                            if (!user.profileImageData) {
                                user.profileImageData = './img/defaultProfileImage.png';
                            }
                        })
                    }, function (error) {
                        $scope.users = {};
                        console.log(error);
                    });
            } else {
                $scope.users = {};
            }

        };

        $scope.users = {};

        //$scope.search = "";
        //$scope.states = ["Alabama","Alaska","Arizona","Arkansas","California",
        //    "Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii",
        //    "Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana",
        //    "Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi",
        //    "Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey",
        //    "New Mexico","New York","North Dakota","North Carolina","Ohio","Oklahoma",
        //    "Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
        //    "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia",
        //    "Wisconsin","Wyoming"];

    });