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
        },
        {
            id: '3',
            name: 'Jack Maccanna',
            role: 'Event manager',
            date_joined: '09.08.2018',
            thumbnail: '/assets/images/persons/3/thumb.jpg',
            thumbnail_desc: 'Through empowerment programs that build leadership, teamwork and confidence, you\'re not only making a brighter future possible, but you\'re also creating a positive ripple effect on kids\' communities.'
        },
        {
            id: '3',
            name: 'Jack Maccanna',
            role: 'Event manager',
            date_joined: '09.08.2018',
            thumbnail: '/assets/images/persons/3/thumb.jpg',
            thumbnail_desc: 'Through empowerment programs that build leadership, teamwork and confidence, you\'re not only making a brighter future possible, but you\'re also creating a positive ripple effect on kids\' communities.'
        },
        {
            id: '3',
            name: 'Jack Maccanna',
            role: 'Event manager',
            date_joined: '09.08.2018',
            thumbnail: '/assets/images/persons/3/thumb.jpg',
            thumbnail_desc: 'Through empowerment programs that build leadership, teamwork and confidence, you\'re not only making a brighter future possible, but you\'re also creating a positive ripple effect on kids\' communities.'
        },
        {
            id: '3',
            name: 'Jack Maccanna',
            role: 'Event manager',
            date_joined: '09.08.2018',
            thumbnail: '/assets/images/persons/3/thumb.jpg',
            thumbnail_desc: 'Through empowerment programs that build leadership, teamwork and confidence, you\'re not only making a brighter future possible, but you\'re also creating a positive ripple effect on kids\' communities.'
        },
        {
            id: '3',
            name: 'Jack Maccanna',
            role: 'Event manager',
            date_joined: '09.08.2018',
            thumbnail: '/assets/images/persons/3/thumb.jpg',
            thumbnail_desc: 'Through empowerment programs that build leadership, teamwork and confidence, you\'re not only making a brighter future possible, but you\'re also creating a positive ripple effect on kids\' communities.'
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

(async () => {

    const volounteersData = await getVolounteersThumbnailsData();
    const volounteerFields = ['id', 'thumbnail', 'name', 'role', 'date_joined', 'thumbnail_desc']
    const volounteers = await Promise.all(volounteersData.map(async (data) => {
        const volounteer = new VolounteerSmall(data, 'volounteer-small', volounteerFields);
        return await volounteer.initialize();
    }))

    global.insertCSSToHead('volounteer-small');
    global.appendChildrenToSlot(global.getTemplateSlot('volounteers'), volounteers);

})();