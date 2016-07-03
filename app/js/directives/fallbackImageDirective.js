socialNetworkApp.directive('fallbackSrc', function () {
    return {
        link: function postLink(scope, element, attrs) {
            element.bind('error', function() {
                angular.element(this).attr("src", attrs.fallbackSrc);
            });

            attrs.$observe('ngSrc', function(value) {
                if (!value && attrs.fallbackSrc) {
                    attrs.$set('src', attrs.fallbackSrc);
                }
            });
        }
    }
});