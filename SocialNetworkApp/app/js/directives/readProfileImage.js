socialNetworkApp.directive("readProfileImage", [function () {
    return {
        scope: {
            readProfileImage: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.readProfileImage = loadEvent.target.result;
                    });
                };
                if (changeEvent.target.files[0] &&
                    changeEvent.target.files[0].size > 128000) {
                   console.log('Error!');
                } else {
                    reader.readAsDataURL(changeEvent.target.files[0]);
                }
            });
        }
    }
}]);