const parseEvents = (events) => {
    return events.map(event => {
        return {
            id: event.id,
            thumbnail: event.thumbnail.thumbnail,
            thumbnail_desc: event.thumbnail.thumbnail_desc,
            name: event.thumbnail.title,
            location: `${event.location.name}, ${event.location.country}`
        }
    });
}

const parseServices = (services) => {
    return services.map(service => {
        return {
            id: service.id,
            thumbnail: service.thumbnail.thumbnail,
            title: service.thumbnail.title
        }
    })
}

const setInnerHtml = data => {

    $('[data-value="name"]').each((i, el) => {
            $(el).html(data.name);
        })
    $('#header-photo').attr('src', data.header_photo)
    $('#center-activities').html(data.center_activities);
    $('#description-divider').html(data.description);
    $('#practical-info').html(data.practical_info)
    $('#cta-description').html(data.cta);
}


(async () => {
    let testimonialTemplate, eventTemplate, serviceTemplate;
    const queryParams = new URLSearchParams(window.location.search);

    const testimonialFields = ['id', 'person_desc', 'testimonial', 'photo']
    const eventFields = ['id', 'thumbnail', 'name', 'thumbnail_desc', 'location']
    const serviceFields = ['id', 'thumbnail', 'title']

    // Fetch data
    let [ serviceData, servicesThumbnails ] = await Promise.all([
        global.fetchData(`/services/${queryParams.get('id')}`),
        global.fetchData('/services')
    ]);


    // Get data JSON, fetch templates
    [ serviceData, servicesThumbnails, testimonialTemplate, eventTemplate, serviceTemplate] = await Promise.all([
        serviceData.json(), servicesThumbnails.json(),
        global.getTemplate('testimonial'), global.getTemplate('event-small'), global.getTemplate('service-overlay')
    ]);

    setInnerHtml(serviceData);

    // Fomat Data
    servicesThumbnailsData = parseServices(servicesThumbnails.filter(service => service.id != queryParams.get('id')));

    // initialize testimonials
    const testimonials = serviceData.testimonials.map(data => {
        return new Testimonial(data, 'testimonial', testimonialFields, testimonialTemplate);
    });

    // initialize events
    const events = parseEvents(serviceData.events).map(data => {
        return new EventSmall(data, 'event-small', eventFields, eventTemplate);
    });

    // initialize services
    const services = servicesThumbnailsData.map(data => {
        return new ServiceOverlay(data, 'service-overlay', serviceFields, serviceTemplate);
    });

    // add template's css
    global.insertCSSToHead('testimonial');
    global.insertCSSToHead('event-small');
    global.insertCSSToHead('service-overlay');

    // insert elements into DOM
    global.appendChildrenToSlot(global.getTemplateSlot('testimonial'), testimonials)
    global.appendChildrenToSlot(global.getTemplateSlot('events'), events);
    global.appendChildrenToSlot(global.getTemplateSlot('services'), services)

})();