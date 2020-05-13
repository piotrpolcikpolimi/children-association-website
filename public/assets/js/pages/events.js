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
    // Fetch data
    let eventsData = await global.fetchData('/events', 'offset=0&limit=8');
    let eventsTemplate;

    // Get data JSON, fetch template
    [ eventsData, eventsTemplate ] = await Promise.all([
        eventsData.json(), global.getTemplate('event-large')]);

    // initialize events
    const events = eventsData.events.map(data => new EventLarge(parseEvents(data), 'event-large', ['id', 'thumbnail', 'name', 'thumbnail_desc', 'location', 'flag'], eventsTemplate));

    // add template's css
    global.insertCSSToHead('event-large');

    // insert elments into DOM
    global.appendChildrenToSlot(global.getTemplateSlot('events'), events);
})();