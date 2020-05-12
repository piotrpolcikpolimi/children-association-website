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
    const eventFields = ['id', 'thumbnail', 'name', 'thumbnail_desc', 'location', 'flag']

    let eventsData = await global.fetchData('/events', 'offset=0&limit=8'),
        eventsTemplate;
    
    [ eventsData, eventsTemplate ] = await Promise.all([
        eventsData.json(), global.getTemplate('event-large')]);

    const events = eventsData.events.map(data => {
        return new EventLarge(parseEvents(data), 'event-large', eventFields, eventsTemplate);
    });

    global.insertCSSToHead('event-large');
    global.appendChildrenToSlot(global.getTemplateSlot('events'), events);

})();