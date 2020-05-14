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


(async () => {
    let testimonialTemplate, eventTemplate, serviceTemplate;
    const queryParams = new URLSearchParams(window.location.search);

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

    // insert global data
    global.insertDataIntoDOM(serviceData);

    // Fomat Data
    servicesThumbnailsData = parseServices(servicesThumbnails.filter(service => service.id != queryParams.get('id')));

    // initialize testimonials
    const testimonials = serviceData.testimonials.map(data => new Testimonial(data, 'testimonial', ['id', 'person_desc', 'testimonial', 'photo'], testimonialTemplate));

    // initialize events
    const events = parseEvents(serviceData.events).map(data => new EventSmall(data, 'event-small', ['id', 'thumbnail', 'name', 'thumbnail_desc', 'location'], eventTemplate));

    // initialize services
    const services = servicesThumbnailsData.map(data => new ServiceOverlay(data, 'service-overlay', ['id', 'thumbnail', 'title'], serviceTemplate));

    // add template's css
    global.insertCSSToHead('testimonial');
    global.insertCSSToHead('event-small');
    global.insertCSSToHead('service-overlay');

    // insert elements into DOM
    global.appendTestimonials(testimonials);
    global.appendChildrenToSlot(global.getTemplateSlot('events'), events);
    global.appendChildrenToSlot(global.getTemplateSlot('services'), services);

})();