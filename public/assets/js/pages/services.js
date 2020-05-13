const parseService = (data) => {
    return {
        id: data.id,
        title: data.thumbnail.title,
        thumbnail: data.thumbnail.thumbnail,
        thumbnail_desc: data.thumbnail.thumbnail_desc
    }
}

(async () => {
    // Fetch data
    let serviceData = await global.fetchData('/services');
    let serviceTemplate;
    
    // Get data JSON, fetch template
    [ serviceData, serviceTemplate ] = await Promise.all([
        serviceData.json(), global.getTemplate('service-small')]);

    // initialize services
    const services = serviceData.map(data => new ServiceSmall(parseService(data), 'service-small', ['id', 'title', 'thumbnail', 'thumbnail_desc'], serviceTemplate));
    
    // add template's css
    global.insertCSSToHead('service-small');

    // insert elements into DOM
    global.appendChildrenToSlot(global.getTemplateSlot('services'), services)

})();