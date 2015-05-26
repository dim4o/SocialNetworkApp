socialNetworkApp.controller('paginationController', function ($scope, userData) {

    $scope.postss = {};


    userData.getNewsFeedsPages('', 10)
        .then(function (postsData) {
            console.log(postsData);
            //return postsData;
            $scope.postsData = postsData;
            $scope.loadMore = function () {
                var lastPost = $scope.postsData[$scope.postsData.length - 1];

                userData.getNewsFeedsPages(lastPost.id, 10)
                    .then(function (newPostsData) {
                        for (var i = 0; i < newPostsData.length; i++) {
                            $scope.postsData.push(newPostsData[i]);
                        }
                    }, function () {
                        console.log(error);
                    });
            }
        }, function (error) {
            console.log(error);
        });


});

