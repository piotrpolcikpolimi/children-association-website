const parsePerson = (data) => {
    return {
        id: data.id,
        name: data.thumbnail.title,
        thumbnail: data.thumbnail.thumbnail,
        thumbnail_desc: data.thumbnail.thumbnail_desc,
        role: data.role,
        date_joined: data.joining_date,
    }
}

(async () => {
    // Fetch data
    let volounteersData = await global.fetchData('/persons','offset=0&limit=9');
    let volounteersTemplate;

    // Get data JSON, fetch template
    [ volounteersData, volounteersTemplate ] = await Promise.all([
        volounteersData.json(), global.getTemplate('volounteer-small')]);

    // initialize volounteers
    const volounteers = volounteersData.persons.map(data => new VolounteerSmall(parsePerson(data), 'volounteer-small', ['id', 'thumbnail', 'name', 'role', 'date_joined', 'thumbnail_desc'], volounteersTemplate));

    // add template's css
    global.insertCSSToHead('volounteer-small');

    // insert elements into DOM
    global.appendChildrenToSlot(global.getTemplateSlot('volounteers'), volounteers);

    $(document).ready(setTimeout(() => {global.loaded()},300));

})();