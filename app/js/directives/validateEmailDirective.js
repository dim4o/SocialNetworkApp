socialNetworkApp.directive('validateEmail', function() {

    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            if (!ctrl) {
                return false;
            }

            function isValidEmail(value) {
                if (!value) {
                    return false;
                }
                var regex = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/i;
                return regex.exec(value) != null;
            }

            scope.$watch(ctrl, function () {
                ctrl.$validate();
            });

            ctrl.$validators.email = function (modelValue, viewValue) {
                return isValidEmail(viewValue);
            };
        }
    };
});/**
 * Created by Dimcho on 26-May-15.
 */
