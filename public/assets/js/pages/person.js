const getVolounteersThumbnailsData = async () => {
    return [
        {
            id: '3',
            name: 'Jack McCanna',
            thumbnail: '/assets/images/persons/3/thumb.jpg',
            volounteer_desc: 'Leading global staff at Children Association (CA) who change children’s lives. Jack\'s focus is ensuring children are healthy, educated, empowered and eventually employed. These four key outcomes are all interconnected and essential to achieving our vision:<br/>Bringing people together to end poverty for good.'
        }
    ]
}

const getServicesThumbnailsData = async () => {
    return [
        {
            id: '1',
            title: 'Health',
            thumbnail: '/assets/images/services/1/thumb.jpg',
            thumbnail_desc: 'Knowledge is power, especially when it comes to getting and staying healthy. So our health programs focus on two important things: <br/>1) developing healthy habits <br/>2) connecting kids with services when they need help.'
        }, {
            id: '2',
            title: 'Education',
            thumbnail: '/assets/images/services/2/thumb.jpg',
            thumbnail_desc: 'Knowledge is power, especially when it comes to getting and staying healthy. So our health programs focus on two important things: <br/>1) developing healthy habits <br/>2) connecting kids with services when they need help.'
        }
    ]
}

const getTestimonialsData = async () => {
    return [
        {
            id: '1',
            thumbnail: '/assets/images/testimonials/1/thumb.jpg',
            person: 'Joel Lambert, CA World-changer <br> (Also a former navy seal and actor)',
            testimonial: '“Being a sponsor humbles me. It takes my eyes off of myself for a moment and allows me to do what I can to facilitate another’s journey. Even in such a small way ... It’s a chance to be a bit bigger than myself.”'
        },
        {
            id: '2',
            thumbnail: '/assets/images/testimonials/2/thumb.jpg',
            person: 'Am3w V., CA World-changer since 2004 </br> (Also world-renowned opera singer)',
            testimonial: '“Kids just want to be kids no matter where in the world you are. CI makes a tremendous difference in their lives offering them education, health care, opportunities and a chance to just have fun.”'
        }
    ]
}

const getEventsThumbnailsData = async () => {
    return [
        {
            id: '1',
            name: 'Treks For Charity To Benefit Children\'s Health',
            thumbnail: '/assets/images/events/4/thumb.jpg',
            thumbnail_desc: 'If you want to do something a little different, then taking on a trek for charity could be exactly what you are looking for.',
            location: 'Kilimanjaro, Tanzania',
            flag: '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'
        }
    ]
}

(async () => {
    if (typeof(google) !== 'undefined') {
        global.initMap(45.4784315, 9.2283424);
    }

    const volounteersData = await getVolounteersThumbnailsData();
    const volounteerFields = ['id', 'thumbnail', 'name', 'volounteer_desc']
    const volounteers = await Promise.all(volounteersData.map(async (data) => {
        const volounteer = new VolounteerLarge(data, 'volounteer-large', volounteerFields);
        return await volounteer.initialize();
    }))

    global.insertCSSToHead('volounteer-large');
    global.appendChildrenToSlot(global.getTemplateSlot('volounteers'), volounteers);
    

    const serviceData = await getServicesThumbnailsData();
    const serviceFields = this.elements = ['id', 'thumbnail', 'title', 'thumbnail_desc']
    const services = await Promise.all(serviceData.map(async (data) => {
        const service = new ServiceLarge(data, 'service-large', serviceFields);
        return await service.initialize();
    }));

    global.insertCSSToHead('service-large');
    global.appendChildrenToSlot(global.getTemplateSlot('services'), services)

    const testimonialData = await getTestimonialsData();
    const testimonialFields = this.elements = ['id', 'person', 'testimonial', 'thumbnail']
    const testimonials = await Promise.all(testimonialData.map(async (data) => {
        const testimonial = new Testimonial(data, 'testimonial', testimonialFields);
        return await testimonial.initialize();
    }));

    global.insertCSSToHead('testimonial');
    global.appendChildrenToSlot(global.getTemplateSlot('testimonial'), testimonials)
    
    const eventsData = await getEventsThumbnailsData();
    const eventFields = ['id', 'thumbnail', 'name', 'thumbnail_desc', 'location', 'flag']
    const events = await Promise.all(eventsData.map(async (data) => {
        const event = new EventLarge(data, 'event-large', eventFields);
        return await event.initialize();
    }));
    global.insertCSSToHead('event-large');
    global.appendChildrenToSlot(global.getTemplateSlot('events'), events);
})();


