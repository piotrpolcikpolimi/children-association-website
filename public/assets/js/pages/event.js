const parseThumbnail = (data) => {
    return {
        id: data.id,
        title: data.thumbnail.title,
        thumbnail: data.thumbnail.thumbnail,
        thumbnail_desc: data.thumbnail.thumbnail_desc,
    }
}


(async () => {
    let volounteerTemplate, serviceTemplate, testimonialTemplate;
    const queryParams = new URLSearchParams(window.location.search);

    // Fetch data
    let eventData = await global.fetchData(`/events/${queryParams.get('id')}`);

    // Get data JSON, fetch templates
    [ eventData, volounteerTemplate, serviceTemplate, testimonialTemplate ] = await Promise.all([
        eventData.json(), global.getTemplate('volounteer-large'), 
        global.getTemplate('service-large'), global.getTemplate('testimonial')
    ]);

    // insert global data
    global.insertDataIntoDOM(eventData);

    // initialize map widget
    if (typeof(google) !== 'undefined') {
        global.initMap([{lat: eventData.location.latitude, lng: eventData.location.longitude}]);
    }

    // initialize volounteers
    const volounteers = [new VolounteerLarge(parseThumbnail(eventData.manager), 'volounteer-large', ['id', 'thumbnail', 'title', 'thumbnail_desc'], volounteerTemplate)];

    // initialize services
    const services = eventData.services.map(data => new ServiceLarge(parseThumbnail(data), 'service-large', ['id', 'thumbnail', 'title', 'thumbnail_desc'], serviceTemplate));

    // initialize testimonials
    const testimonials = eventData.testimonials.map(data => new Testimonial(data, 'testimonial', ['id', 'person_desc', 'testimonial', 'photo'], testimonialTemplate));

    // add template's css
    global.insertCSSToHead('volounteer-large');
    global.insertCSSToHead('service-large');
    global.insertCSSToHead('testimonial');

    // insert elements into DOM
    global.appendChildrenToSlot(global.getTemplateSlot('volounteers'), volounteers);
    global.appendChildrenToSlot(global.getTemplateSlot('services'), services);
    global.appendTestimonials(testimonials);

    $(document).ready(setTimeout(() => {global.loaded()},300));
})();

