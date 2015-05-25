socialNetworkApp.directive("readCoverImage", [function () {
    return {
        scope: {
            readCoverImage: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.readCoverImage = loadEvent.target.result;
                    });
                };

                if (changeEvent.target.files[0] &&
                    changeEvent.target.files[0].size > 1024000) {
                    console.log('Error!');
                } else {
                    reader.readAsDataURL(changeEvent.target.files[0]);
                }
            });
        }
    }
}]);