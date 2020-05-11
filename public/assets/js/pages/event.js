const getVolounteersThumbnailsData = async () => {
    return [
        {
            id: '1',
            name: 'Susana Eshleman',
            thumbnail: '/assets/images/persons/1/thumb.jpg',
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
    const testimonialFields = ['id', 'person', 'testimonial', 'thumbnail']
    const testimonials = await Promise.all(testimonialData.map(async (data) => {
        const testimonial = new Testimonial(data, 'testimonial', testimonialFields);
        return await testimonial.initialize();
    }));

    global.insertCSSToHead('testimonial');
    global.appendChildrenToSlot(global.getTemplateSlot('testimonial'), testimonials)
})();

