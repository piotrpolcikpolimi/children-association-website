let pagination;

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

const getMonthName = (monthNumber) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return months[monthNumber-1];
}

const setLocationInfo = (locations) => {
    const locationInfo = $('.location-info');
    let html = '';


    const locationString = locations.map(location => {
        if (location.class !== 'inactive') {
            html += `<span class="active">
                         ${location.text}
                     </span>`;
        } else {
            html += `<span class="inactive">
                    <a href="${location.href}">
                        ${location.text}
                    </a>
                </span> / `;
        }
    })

    locationInfo.html(html);
}

const getEventsLimit = () => {
    let limit = 4;
    if (window.innerWidth > 400 && window.innerWidth < 769) limit = 3;
    if (window.innerWidth < 401) limit = 2;

    return limit;
}

(async () => {
    const limit = getEventsLimit();
    const queryParams = new URLSearchParams(window.location.search);
    let eventsData, eventsTemplate;

    // Fetch data
    if (queryParams.get('country')) {
        eventsData = await global.fetchData('/events', `offset=0&limit=${limit}&country=${queryParams.get('country')}`);
        setLocationInfo([{ class: 'inactive',text: 'Event',href: './events.html'},{class: 'inactive',text: 'Events By Country',href: './bycountry.html'},{class: 'active',text: queryParams.get('country'),}])
    } else if (queryParams.get('month')) {
        eventsData = await global.fetchData('/events', `offset=0&limit=${limit}&month=${queryParams.get('month')}`);
        setLocationInfo([{ class: 'inactive',text: 'Event', href: './events.html'},{class: 'inactive',text: 'Events By Month',href: './bymonth.html'},{class: 'active',text: getMonthName(queryParams.get('month'))}])
    } else {
        eventsData = await global.fetchData('/events', `offset=0&limit=${limit}`);
    }
    if (eventsData.status === 404 && queryParams.get('month')) {
        global.getTemplateSlot('events').append(`
        <div style="display: flex; flex-direction: column; align-items: center;">
            <p>No events are organized in this month</p>
            <a href="bymonth.html" style="padding: 7px; border: 2px solid #CD4A47; color: #CD4A47; margin-top: 10px;">Go back</a>
        </div>`);
        $(document).ready(setTimeout(() => {global.loaded()},300));
        return;
    }
    // Get data JSON, fetch template
    [ eventsData, eventsTemplate ] = await Promise.all([
        eventsData.json(), global.getTemplate('event-large')]);

    // initialize events
    const events = eventsData.events.map(data => new EventLarge(parseEvent(data), 'event-large', ['id', 'thumbnail', 'name', 'thumbnail_desc', 'location', 'flag'], eventsTemplate));

    // add template's css
    global.insertCSSToHead('event-large');

    // insert elments into DOM
    global.appendChildrenToSlot(global.getTemplateSlot('events'), events);

    pagination = new Pagination('/events', 'events', limit, eventsData.meta.total_number, global.getTemplateSlot('events'), EventLarge.prototype.constructor, ['event-large', ['id', 'thumbnail', 'name', 'thumbnail_desc', 'location', 'flag'], eventsTemplate], parseEvent);
    pagination.initialize().then(() => {
        pagination.render();
    })

    $(document).ready(setTimeout(() => {global.loaded()},300));
})();