socialNetworkApp.directive("readProfileImage", ['notificationService', function (notificationService) {
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
                    console.log(changeEvent.target.files[0].name);
                    notificationService.error('Error', 'Aasdfsdfd');
                    attributes.$observe('readProfileImage', function (value) {
                        console.log(value);
                    })
                } else {
                    reader.readAsDataURL(changeEvent.target.files[0]);
                    attributes.$observe('readProfileImage', function (value) {
                        console.log(value);
                    })
                }
            });
        }
    }
}]);