const parseEvents = (data) => {
    return {
        id: data.id,
        name: data.thumbnail.title,
        thumbnail: data.thumbnail.thumbnail,
        thumbnail_desc: data.thumbnail.thumbnail_desc,
        location: data.location.name + ', ' + data.location.country,
        flag: data.location.country_flag_icon
    }
}

(async () => {

    let eventsData = await global.fetchData('/events', 'offset=0&limit=8');
    eventsData = await eventsData.json();
    const eventFields = ['id', 'thumbnail', 'name', 'thumbnail_desc', 'location', 'flag']
    const events = await Promise.all(eventsData.events.map(async (data) => {
        const object = parseEvents(data);
        const event = new EventLarge(object, 'event-large', eventFields);
        return await event.initialize();
    }))
    global.insertCSSToHead('event-large');
    global.appendChildrenToSlot(global.getTemplateSlot('events'), events);

})();