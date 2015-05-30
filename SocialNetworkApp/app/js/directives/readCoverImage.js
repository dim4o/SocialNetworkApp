socialNetworkApp.directive("readCoverImage", ['notificationService', function (notificationService) {
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

                file = changeEvent.target.files[0];
                if (file && !file.type.match(/image\/.*/)) {

                    attributes.$observe('readCoverImage', function () {
                        notificationService.error('Invalid file format.',
                            'Allowed format: .jpg ');
                    })
                } else if(file && file.size > 1024000){


                    attributes.$observe('readCoverImage', function () {
                        notificationService.error('File size limit exceeded.',
                            'The maximum upload size for profile image is 1024kb.');
                    })
                } else {
                    reader.readAsDataURL(changeEvent.target.files[0]);
                }
            });
        }
    }
}]);