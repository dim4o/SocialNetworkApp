socialNetworkApp.filter('gender', function gender() {
    return function (gender) {
        switch(gender) {
            case 0: return 'Other';
            case 1: return 'Male';
            case 2: return 'Female';
        }
    }
});