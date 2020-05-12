const parsePerson = (data) => {
    return {
        id: data.id,
        name: data.thumbnail.title,
        thumbnail: data.thumbnail.thumbnail,
        thumbnail_desc: data.thumbnail.thumbnail_desc,
        role: data.role,
        date_joined: data.date_joined,
    }
}

(async () => {

    let volounteersData = await global.fetchData('/persons','offset=0&limit=9');
    volounteersData = await volounteersData.json();
    const volounteerFields = ['id', 'thumbnail', 'name', 'role', 'date_joined', 'thumbnail_desc']
    const volounteers = await Promise.all(volounteersData.persons.map(async (data) => {
        const object = parsePerson(data);
        const volounteer = new VolounteerSmall(object, 'volounteer-small', volounteerFields);
        return await volounteer.initialize();
    }))

    global.insertCSSToHead('volounteer-small');
    global.appendChildrenToSlot(global.getTemplateSlot('volounteers'), volounteers);

})();