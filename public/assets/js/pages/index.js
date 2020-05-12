const parseService = (data) => {
    return {
        id: data.id,
        title: data.thumbnail.title,
        thumbnail: data.thumbnail.thumbnail,
        thumbnail_desc: data.thumbnail.thumbnail_desc
    }
}

const parseEvents = (data) => {
    return {
        id: data.id,
        name: data.thumbnail.title,
        thumbnail: data.thumbnail.thumbnail,
        thumbnail_desc: data.thumbnail.thumbnail_desc,
    }
}


const parsePerson = (data) => {
    return {
        id: data.id,
        name: data.thumbnail.title,
        thumbnail: data.thumbnail.thumbnail,
        thumbnail_desc: data.thumbnail.thumbnail_desc,
        role: data.role,
        date_joined: data.date_joined,
    }
}



(async () => {

    let serviceData = await global.fetchData('/services');
    serviceData = await serviceData.json();
    const serviceFields = ['id', 'thumbnail', 'title', 'thumbnail_desc']
    const services = await Promise.all(serviceData.map(async (data) => {
        const service = new ServiceSmall(parseService(data), 'service-small', serviceFields);
        return await service.initialize();
    }));

    global.insertCSSToHead('service-small');
    global.appendChildrenToSlot(global.getTemplateSlot('services'), services)


    let volounteersData = await global.fetchData('/persons','offset=0&limit=3');
    volounteersData = await volounteersData.json();
    const volounteerFields = ['id', 'thumbnail', 'name', 'thumbnail_desc']
    const volounteers = await Promise.all(volounteersData.persons.map(async (data) => {
        const volounteer = new VolounteerSmall(parsePerson(data), 'volounteer-small', volounteerFields);
        return await volounteer.initialize();
    }));

    global.insertCSSToHead('volounteer-small');
    global.appendChildrenToSlot(global.getTemplateSlot('volounteers'), volounteers);

    let eventsData = await global.fetchData('/events', 'offset=0&limit=8');
    eventsData = await eventsData.json();
    const eventFields = ['id', 'thumbnail', 'name', 'thumbnail_desc']
    const events = await Promise.all(eventsData.events.map(async (data) => {
        const event = new EventLarge(parseEvents(data), 'event-large', eventFields);
        return await event.initialize();
    }));

    global.insertCSSToHead('event-large');
    global.appendChildrenToSlot(global.getTemplateSlot('events'), events);

})();
