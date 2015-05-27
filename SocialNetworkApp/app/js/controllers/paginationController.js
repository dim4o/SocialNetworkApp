socialNetworkApp.controller('paginationController', function ($scope, userProfileService, usSpinnerService) {
    console.log('Pagination Controller Initialization');
    //$scope.postss = {};
    usSpinnerService.spin('spinner-1');

    userProfileService.getNewsFeedsPages('', 5)
        .then(function (postsData) {
            console.log('First page post request: ');
            console.log(postsData);
            //return postsData;
            $scope.postsData = postsData;

            $scope.loadMore = function () {
                var lastPost = $scope.postsData[$scope.postsData.length - 1];
                usSpinnerService.spin('spinner-1');
                userProfileService.getNewsFeedsPages(lastPost.id, 5)
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

