socialNetworkApp.directive("readProfileImage", ['notificationService', function (notificationService) {
    return {
        scope: {
            readProfileImage: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader(),
                    file;

                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.readProfileImage = loadEvent.target.result;
                    });
                };
                file = changeEvent.target.files[0];
                if (file && !file.type.match(/image\/.*/)) {

                    attributes.$observe('readProfileImage', function () {
                        notificationService.error('Invalid file format.',
                            'Allowed format: .jpg ');
                    })
                } else if(file && file.size > 128000){


                    attributes.$observe('readProfileImage', function () {
                        notificationService.error('File size limit exceeded.',
                            'The maximum upload size for profile image is 128kb.');
                    })
                } else {
                    reader.readAsDataURL(changeEvent.target.files[0]);
                }
            });
        }
    }
}]);