socialNetworkApp.controller('userWallController',
    function ($scope, usersService, $routeParams, usSpinnerService) {
        //$scope.userWallData = {};

        $scope.currUserUsername = $routeParams.username;

        //usersService.getFriendWallByPages($routeParams.username)
        //        .then(function (userWallDataInfo) {
        //            $scope.postsData = userWallDataInfo;
        //            console.log($scope.postsData);
        //            $scope.currentUsername = $routeParams.username;
        //        }, function (error) {
        //             console.log(error);
        //        });

        usersService.getUserFullData($routeParams.username)
            .then(function (userFullData) {
                $scope.currUserUsername = null;
                $scope.userFullData = userFullData;
                $scope.currUserUsername = userFullData.username;
            }, function (error) {
                console.log(error);
            });

        // TODO: duplicate method - newsFeedsController
        $scope.popupPersonPreview = function (username) {
            $scope.showPopup = true;
            $scope.userData = {};
            $scope.userData.profileImageData = './img/defaultProfileImage.png';
            $(".anim").show(300).delay(900).hide(300);
            usersService.getUserPreviewData(username)
                .then(function (userData) {
                    $scope.userData = userData;
                    console.log(userData);
                }, function (error) {
                    console.log(error);
                });
        };
        //userData.getFriendsFriendsPreview($routeParams.username)
        //    .then(function (fiendsFriendsData) {
        //        console.log(fiendsFriendsData);
        //        alert('Friends');
        //    }, function (error) {
        //        console.log(error);
        //    });

        console.log('Pagination Controller Initialization');
        //$scope.postss = {};
        usSpinnerService.spin('spinner-1');

        usersService.getFriendWallByPages($routeParams.username, '', 5)
            .then(function (postsData) {
                console.log('First page post request: ');
                console.log(postsData);
                //return postsData;
                $scope.postsData = postsData;
                $scope.currentUsername = $routeParams.username;

                $scope.loadMore = function () {
                    var lastPost = $scope.postsData[$scope.postsData.length - 1];
                    usSpinnerService.spin('spinner-1');
                    usersService.getFriendWallByPages($routeParams.username, lastPost.id, 5)
                        .then(function (newPostsData) {
                            for (var i = 0; i < newPostsData.length; i++) {
                                $scope.postsData.push(newPostsData[i]);
                            }
                            usSpinnerService.stop('spinner-1');
                            console.log('New pages post requests: ');
                            console.log(newPostsData);
                        }, function () {
                            console.log(error);
                        });
                };
                usSpinnerService.stop('spinner-1');
            }, function (error) {
                console.log(error);
            });
        
    });
