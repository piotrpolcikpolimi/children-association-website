(async () => {
    if (typeof(google) !== 'undefined') {
        global.initMap([{lat: 45.4784315, lng: 9.2283424}]);
    }

    $(document).ready(setTimeout(() => {global.loaded()},300));
})();

