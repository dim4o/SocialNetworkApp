socialNetworkApp.factory('notificationService', function (toaster) {
    return {
        error: function (title, msg) {
            toaster.pop({
                type: 'error',
                title: title,
                body: msg,
                showCloseButton: true
            });
        },

        success: function (title, msg) {
            toaster.pop({
                type: 'success',
                title: title,
                body: msg,
                timeout: 2500,
                animationClass: 'toast-top-center'
            });
        }
    }
});