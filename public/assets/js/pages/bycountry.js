const parseEvent = (data) => {
    return {
        id: data.id,
        name: data.thumbnail.title,
        thumbnail: data.thumbnail.thumbnail,
        thumbnail_desc: data.thumbnail.thumbnail_desc,
        location: data.location.name + ', ' + data.location.country,
        flag: data.location.country_flag_icon
    }
}


const getLocationsCoordinates = (locations) => {
    return locations.map(location => {
        return {lat: location.latitude, lng: location.longitude}
    })
}

(async () => {
    // Fetch data
    let locationsData = await global.fetchData('/locations');
    let countrySelectorTemplate;

    // Get data JSON, fetch template
    [ locationsData, countrySelectorTemplate ] = await Promise.all([
        locationsData.json(), global.getTemplate('country-selector')]);

    const zoom = window.innerWidth > 768 ? 3 : 1;
    if (typeof(google) !== 'undefined') {
        global.initMap(getLocationsCoordinates(locationsData), {lat: 0, lng: 30}, zoom);
    }
    

    // initialize events
    const countrySelectors = locationsData.map(data => new CountrySelector(data, 'country-selector', ['id', 'country_flag_icon', 'country'], countrySelectorTemplate));

    // add template's css
    global.insertCSSToHead('country-selector');

    // insert elments into DOM
    global.appendChildrenToSlot(global.getTemplateSlot('country-selectors'), countrySelectors);

    $(document).ready(setTimeout(() => {global.loaded()},300));
})();