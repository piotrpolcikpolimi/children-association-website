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

const parseService = (data) => {
    return {
        id: data.id,
        title: data.thumbnail.title,
        thumbnail: data.thumbnail.thumbnail,
        thumbnail_desc: data.thumbnail.thumbnail_desc,
    }
}


(async () => {
    let testimonialTemplate, serviceTemplate, eventTemplate;
    const queryParams = new URLSearchParams(window.location.search);

    // Fetch data
    let personData = await global.fetchData(`/persons/${queryParams.get('id')}`);

    // Get data JSON, fetch templates
    [personData, testimonialTemplate, serviceTemplate, eventTemplate] = await Promise.all([
        personData.json(), global.getTemplate('testimonial'),
        global.getTemplate('service-large'), global.getTemplate('event-large')
    ]);

    // insert global data
    global.insertDataIntoDOM(personData);

    // initialize testimonials
    const testimonials = personData.testimonials.map(data => new Testimonial(data, 'testimonial', ['id', 'person_desc', 'testimonial', 'photo'], testimonialTemplate));

    // initialize services
    const services = personData.services.map(data => new ServiceLarge(parseService(data), 'service-laqrge', ['id', 'thumbnail', 'title', 'thumbnail_desc'], serviceTemplate));

    // initialize events
    let events;
    if (!$.isEmptyObject(personData.event)) {
        events = [new EventLarge(parseEvent(personData.event), 'event-larg0e0', ['id', 'thumbnail', 'name', 'thumbnail_desc', 'location', 'flag'], eventTemplate)];

    }

    // add template's css
    global.insertCSSToHead('testimonial');
    global.insertCSSToHead('service-large');
    global.insertCSSToHead('event-large');

    // insert elments into DOM
    global.appendTestimonials(testimonials);
    global.appendChildrenToSlot(global.getTemplateSlot('services'), services)

    if (events) { 
        global.appendChildrenToSlot(global.getTemplateSlot('events'), events)
    } else {
        $('#event').css('display', 'none');
    }
})();


