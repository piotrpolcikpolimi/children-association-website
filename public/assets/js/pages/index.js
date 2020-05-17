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
    // Fetch data
    let [ serviceData, volounteersData, eventsData ] = await Promise.all([
        global.fetchData('/services'), 
        global.fetchData('/persons','offset=0&limit=3'),
        global.fetchData('/events', 'offset=0&limit=2')]);
    let serviceTemplate, volounteerTemplate, eventTemplate;

    // Get data JSON, fetch templates
    serviceData = await serviceData.json();
    [volounteersData, eventsData, serviceTemplate, volounteerTemplate, eventTemplate]  = await Promise.all([
        volounteersData.json(), eventsData.json(),
        global.getTemplate('service-small'), global.getTemplate('volounteer-small'), global.getTemplate('event-large')]);

    // initialize services
    const services = serviceData.map(data => new ServiceSmall(parseService(data), 'service-small', ['id', 'thumbnail', 'title', 'thumbnail_desc'], serviceTemplate));

    // initialize volounteers
    const volounteers = volounteersData.persons.map(data => new VolounteerSmall(parsePerson(data), 'volounteer-small', ['id', 'thumbnail', 'name', 'thumbnail_desc'], volounteerTemplate));

    // initialize events
    const events = eventsData.events.map(data => new EventLarge(parseEvents(data), 'event-large', ['id', 'thumbnail', 'name', 'thumbnail_desc'], eventTemplate));

    // add template's css
    global.insertCSSToHead('service-small');
    global.insertCSSToHead('volounteer-small');
    global.insertCSSToHead('event-large');

    // insert elements into DOM
    global.appendChildrenToSlot(global.getTemplateSlot('events'), events);
    global.appendChildrenToSlot(global.getTemplateSlot('services'), services)
    global.appendChildrenToSlot(global.getTemplateSlot('volounteers'), volounteers);

    // initialize subnavbar
    subnavbar.init(140);

    new Waypoint({
        element: $('#subnavbar-slot')[0],
        handler: (direction) => {
            const subnavbar = $('#subnavbar-slot')
            if (direction === 'down') {
                subnavbar.css({'position': 'fixed'});
                return;
            }
            subnavbar.css('position', '');

        },
        offset: 60
    })
    $(document).ready(setTimeout(() => {global.loaded()},300));

})();
