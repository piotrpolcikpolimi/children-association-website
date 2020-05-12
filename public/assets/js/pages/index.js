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
    let serviceTemplate, volounteerTemplate, eventTemplate;
    const serviceFields = ['id', 'thumbnail', 'title', 'thumbnail_desc']
    const volounteerFields = ['id', 'thumbnail', 'name', 'thumbnail_desc']
    const eventFields = ['id', 'thumbnail', 'name', 'thumbnail_desc']

    // Fetch data
    let [ serviceData, volounteersData, eventsData ] = await Promise.all([
        global.fetchData('/services'), 
        global.fetchData('/persons','offset=0&limit=3'),
        global.fetchData('/events', 'offset=0&limit=2')]);

    // Get data JSON, fetch templates
    serviceData = await serviceData.json();
    [volounteersData, eventsData, serviceTemplate, volounteerTemplate, eventTemplate]  = await Promise.all([
        volounteersData.json(), eventsData.json(),
        global.getTemplate('service-small'), global.getTemplate('volounteer-small'), global.getTemplate('event-large')]);

    // initialize services
    const services = serviceData.map(data => {
        return new ServiceSmall(parseService(data), 'service-small', serviceFields, serviceTemplate);
    });

    // initialize volounteers
    const volounteers = await Promise.all(volounteersData.persons.map(async (data) => {
        return new VolounteerSmall(parsePerson(data), 'volounteer-small', volounteerFields, volounteerTemplate);
    }));

    // initialize events
    const events = await Promise.all(eventsData.events.map(async (data) => {
        return new EventLarge(parseEvents(data), 'event-large', eventFields, eventTemplate);
    }));


    // add template's css
    global.insertCSSToHead('service-small');
    global.insertCSSToHead('volounteer-small');
    global.insertCSSToHead('event-large');

    // insert elements into DOM
    global.appendChildrenToSlot(global.getTemplateSlot('events'), events);
    global.appendChildrenToSlot(global.getTemplateSlot('services'), services)
    global.appendChildrenToSlot(global.getTemplateSlot('volounteers'), volounteers);


})();
