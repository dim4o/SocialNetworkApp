(function () {
    "use strict";

    socialNetworkApp.controller('readerController',
        function readerController($scope) {
            $scope.addImage = function (myFile) {
                console.log(myFile);
                console.log(myFile.size);
            }
        });
}());