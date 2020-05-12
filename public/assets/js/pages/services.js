const parseService = (data) => {
    return {
        id: data.id,
        title: data.thumbnail.title,
        thumbnail: data.thumbnail.thumbnail,
        thumbnail_desc: data.thumbnail.thumbnail_desc
    }
}

(async () => {
    const serviceFields = ['id', 'title', 'thumbnail', 'thumbnail_desc']

    let serviceData = await global.fetchData('/services'),
        serviceTemplate;
    
    [ serviceData, serviceTemplate ] = await Promise.all([
        serviceData.json(), global.getTemplate('service-small')]);

    const services = serviceData.map(data => {
        return new ServiceSmall(parseService(data), 'service-small', serviceFields, serviceTemplate);
    });

    global.insertCSSToHead('service-small');
    global.appendChildrenToSlot(global.getTemplateSlot('services'), services)

})();