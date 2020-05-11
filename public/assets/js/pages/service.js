const getEventsThumbnailsData = async () => {
    return [
        {
            id: '1',
            name: 'Christmas Charity Event To Arrange Clothes And Food For Children',
            thumbnail: '/assets/images/events/1/thumb.jpg',
            thumbnail_desc: 'We have planned a special charity event which is about helping the poor kids by providing them food and clothes.',
            location: 'Mumbai, India',
            date: '16.06.2020'
        },
        {
            id: '2',
            name: 'Cycle For Charity To Benefit Children\'s Education',
            thumbnail: '/assets/images/events/2/thumb.jpg',
            thumbnail_desc: 'Cycling has become one of our favourite national sports. If you have access to a bike, then you can take on a cycle for charity.',
            location: 'Gorgan, Iran ',
            date: '1.12.2019'
        },
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

const getServicesThumbnailsData = async () => {
    return [
        {
            id: '2',
            title: 'Education',
            thumbnail: '/assets/images/services/2/thumb.jpg',
            thumbnail_desc: 'Education doesn\t have a one-size-fits-all solution. Your support is invested in helping kids complete secondary school using a wide range of tools to make it happen: providing school fees, uniforms, supplies, tutoring and scholarships.',

        },
        {
            id: '3',
            title: 'Empowerement',
            thumbnail: '/assets/images/services/3/thumb.jpg',
            thumbnail_desc: 'Through empowerment programs that build leadership, teamwork and confidence, you\'re not only making a brighter future possible, but you\'re also creating a positive ripple effect on kids\' communities.'
        },
        {
            id: '4',
            title: 'Employment',
            thumbnail: '/assets/images/services/4/thumb.jpg',
            thumbnail_desc: 'Mock interviews, résumé writing, connecting with jobs, earning scholarships for college or vocational training, developing workplace and technical skills to help them change their lives for good.'
        }
    ]
}

(async () => {
    const testimonialData = await getTestimonialsData();
    const testimonialFields = ['id', 'person', 'testimonial', 'thumbnail']
    const testimonials = await Promise.all(testimonialData.map(async (data) => {
        const testimonial = new Testimonial(data, 'testimonial', testimonialFields);
        return await testimonial.initialize();
    }));

    global.insertCSSToHead('testimonial');
    global.appendChildrenToSlot(global.getTemplateSlot('testimonial'), testimonials)

    const eventsData = await getEventsThumbnailsData();
    const eventFields = ['id', 'thumbnail', 'name', 'thumbnail_desc', 'location', 'date']
    const events = await Promise.all(eventsData.map(async (data) => {
        const event = new EventSmall(data, 'event-small', eventFields);
        return await event.initialize();
    }));
    global.insertCSSToHead('event-small');
    global.appendChildrenToSlot(global.getTemplateSlot('events'), events);

    const serviceData = await getServicesThumbnailsData();
    const serviceFields = ['id', 'thumbnail', 'title']
    const services = await Promise.all(serviceData.map(async (data) => {
        const service = new ServiceOverlay(data, 'service-overlay', serviceFields);
        return await service.initialize();
    }));

    global.insertCSSToHead('service-overlay');
    global.appendChildrenToSlot(global.getTemplateSlot('services'), services)
})();