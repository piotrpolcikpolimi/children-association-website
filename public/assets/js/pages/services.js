const parseService = (data) => {
    return {
        id: data.id,
        title: data.thumbnail.title,
        thumbnail: data.thumbnail.thumbnail,
        thumbnail_desc: data.thumbnail.thumbnail_desc
    }
}

(async () => {

    let serviceData = await global.fetchData('/services');
    serviceData = await serviceData.json();
    const serviceFields = ['id', 'title', 'thumbnail', 'thumbnail_desc']
    const services = await Promise.all(serviceData.map(async (data) => {
        const object = parseService(data);
        const service = new ServiceSmall(object, 'service-small', serviceFields);
        return await service.initialize();
    }));

    global.insertCSSToHead('service-small');
    global.appendChildrenToSlot(global.getTemplateSlot('services'), services)

})();