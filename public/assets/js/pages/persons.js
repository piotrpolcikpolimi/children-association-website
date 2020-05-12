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
    const volounteerFields = ['id', 'thumbnail', 'name', 'role', 'date_joined', 'thumbnail_desc']

    let volounteersData = await global.fetchData('/persons','offset=0&limit=9'),
        volounteersTemplate;

    [ volounteersData, volounteersTemplate ] = await Promise.all([
        volounteersData.json(), global.getTemplate('volounteer-small')]);

    const volounteers = volounteersData.persons.map(data => {
        return new VolounteerSmall(parsePerson(data), 'volounteer-small', volounteerFields, volounteersTemplate);
    });

    global.insertCSSToHead('volounteer-small');
    global.appendChildrenToSlot(global.getTemplateSlot('volounteers'), volounteers);

})();