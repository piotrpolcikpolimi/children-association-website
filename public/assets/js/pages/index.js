const getServicesThumbnailsData = async () => {
    return [
        {
            id: '1',
            title: 'Health',
            thumbnail: '/assets/images/services/1/thumb.jpg',
            thumbnail_desc: 'Knowledge is power, especially when it comes to getting and staying healthy. So our health programs focus on two important things: <br/>1) developing healthy habits <br/>2) connecting kids with services when they need help.'
        },
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

const getVolounteersThumbnailsData = async () => {
    return [
        {
            id: '1',
            name: 'Susana Eshleman',
            role: 'Managing director',
            date_joined: '09.08.2016',
            thumbnail: '/assets/images/persons/1/thumb.jpg',
            thumbnail_desc: 'Knowledge is power, especially when it comes to getting and staying healthy. So our health programs focus on two important things: <br/>1) developing healthy habits <br/>2) connecting kids with services when they need help.'
        },
        {
            id: '2',
            name: 'Danielle Mitchel',
            role: 'Managing director',
            date_joined: '09.08.2016',
            thumbnail: '/assets/images/persons/2/thumb.jpg',
            thumbnail_desc: 'Education doesn\t have a one-size-fits-all solution. Your support is invested in helping kids complete secondary school using a wide range of tools to make it happen: providing school fees, uniforms, supplies, tutoring and scholarships.',

        },
        {
            id: '3',
            name: 'Jack Maccanna',
            role: 'Event manager',
            date_joined: '09.08.2018',
            thumbnail: '/assets/images/persons/3/thumb.jpg',
            thumbnail_desc: 'Through empowerment programs that build leadership, teamwork and confidence, you\'re not only making a brighter future possible, but you\'re also creating a positive ripple effect on kids\' communities.'
        }
    ]
}

const getEventsThumbnailsData = async () => {
    return [
        {
            id: '1',
            name: 'Adele Concert To Benefit Children\'s Empowerment  From Tickets',
            thumbnail: '/assets/images/events/1/thumb.jpg',
            thumbnail_desc: 'Programme includes works by Scriabin / Blumenfeld / Reinecke / Bach / Alice Charbonnet and others.The Towersey Foundation is a unique charity providing music therapy in palliative care to bothadults and children living with non-curable conditions.'
        },
        {
            id: '2',
            name: 'Treks For Charity To Benefit Children\'s Health',
            thumbnail: '/assets/images/events/2/thumb.jpg',
            thumbnail_desc: 'If you want to do something a little different, then taking on a trek for charity could be exactly what you are looking for. Whether you choose a route close to home or far away, there are a wealth of organised treks or routes you can take on yourself to raise money for health charity.',

        }
    ]
}


(async () => {

    const serviceData = await getServicesThumbnailsData();
    const serviceFields = this.elements = ['id', 'thumbnail', 'title', 'thumbnail_desc']
    const services = await Promise.all(serviceData.map(async (data) => {
        const service = new ServiceLarge(data, 'service-large', serviceFields);
        return await service.initialize();
    }));

    global.insertCSSToHead('service-large');
    global.appendChildrenToSlot(global.getTemplateSlot('services'), services)


    const volounteersData = await getVolounteersThumbnailsData();
    const volounteerFields = ['id', 'thumbnail', 'name', 'thumbnail_desc']
    const volounteers = await Promise.all(volounteersData.map(async (data) => {
        const volounteer = new VolounteerSmall(data, 'volounteer-small', volounteerFields);
        return await volounteer.initialize();
    }))

    global.insertCSSToHead('volounteer-small');
    global.appendChildrenToSlot(global.getTemplateSlot('volounteers'), volounteers);

    const eventsData = await getEventsThumbnailsData();
    const eventFields = ['id', 'thumbnail', 'name', 'thumbnail_desc']
    const events = await Promise.all(eventsData.map(async (data) => {
        const event = new EventLarge(data, 'event-large', eventFields);
        return await event.initialize();
    }))
    global.insertCSSToHead('event-large');
    global.appendChildrenToSlot(global.getTemplateSlot('events'), events);

})();
