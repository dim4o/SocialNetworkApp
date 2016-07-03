socialNetworkApp.filter('genderFilter', function () {
    return function (gender) {
        switch(gender){
            case 1: return 'Male';
            case 2: return 'Female';
            default: return 'Other'
        }
    };
});