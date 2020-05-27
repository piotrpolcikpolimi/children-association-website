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

const getPersonsLimit = () => {
    let limit = 9;
    if (window.innerWidth > 400 && window.innerWidth < 769) limit = 6;
    if (window.innerWidth < 401) limit = 3;

    return limit;
}

(async () => {
    const limit = getPersonsLimit();
    console.log(limit);
    // Fetch data
    let volounteersData = await global.fetchData('/persons',`offset=0&limit=${limit}`);
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

    pagination = new Pagination('/persons', 'persons', limit, volounteersData.meta.total_number, global.getTemplateSlot('volounteers'), VolounteerSmall.prototype.constructor, ['volounteer-small', ['id', 'thumbnail', 'name', 'role', 'date_joined', 'thumbnail_desc'], volounteersTemplate], parsePerson);
    pagination.initialize().then(() => {
        pagination.render();
    });

    $(document).ready(setTimeout(() => {global.loaded()},300));

})();