socialNetworkApp.directive('backgroundDirective', function(){
    return function(scope, element, attrs){
        return function (scope, element, attrs) {
            element.css({
                'background': 'url(\"' + attrs.backgroundDirective + '\")',
                'background-repeat': 'cover'
            });
        };
    };
});