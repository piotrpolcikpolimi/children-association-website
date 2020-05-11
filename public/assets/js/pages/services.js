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

(async () => {

    const serviceData = await getServicesThumbnailsData();
    const serviceFields = this.elements = ['id', 'thumbnail', 'title', 'thumbnail_desc']
    const services = await Promise.all(serviceData.map(async (data) => {
        const service = new ServiceSmall(data, 'service-small', serviceFields);
        return await service.initialize();
    }));

    global.insertCSSToHead('service-small');
    global.appendChildrenToSlot(global.getTemplateSlot('services'), services)

})();