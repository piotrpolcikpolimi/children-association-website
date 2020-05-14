'use strict';

let sqlDb;
let { getThumbnailById,
        getTestimonialById,
        getEventThumbnailById,
        getServiceThumbnailById } = require('./Utils'),
        { getLocationById } = require('./LocationService');


exports.personDbSetup = function(s) {
    sqlDb = s;
    return sqlDb.schema.hasTable('person').then(exists => {
        if (!exists) {
            console.log('Person table does not exists.');
        } else {
            console.log('Person table exsits.')
        }
    })
}

/**
 * Find a person by id
 * Returns a person with a given id
 *
 * id Long id of person to return
 * returns Person
 **/
exports.getPersonById =  async function(id) {
    let [ person, event, testimonials, services, contact ] = await Promise.all([
        sqlDb('person').where('id', id),
        sqlDb('event').where('id_person', id).select('id'),
        sqlDb('person_testimonial').where('id_person', id).select('id_testimonial'),
        sqlDb('person_service').where('id_person', id).select('id_service'),
        sqlDb('contact').where('id', id)
    ]);
    person = person[0];

    person.location = await getLocationById(person.id_location);
    person.contact = contact[0];
    

    [ person.testimonials, person.services, person.thumbnail, person.event, ] = await Promise.all([
        Promise.all(testimonials.map(testimonial => getTestimonialById(testimonial.id_testimonial))),
        Promise.all(services.map(service => getServiceThumbnailById(service.id_service))),
        getThumbnailById(person.id_thumbnail),
        (() => {
            if (event.length > 0) {
                return getEventThumbnailById(event[0].id);
            }
            return new Promise(resolve => resolve({}))
        })()
    ])

    delete person['id_location'];
    delete person['id_thumbnail'];

    return person;
}


/**
 * All available persons
 * Returns list of all the persons
 *
 * offset Long offset of the number of persons to return (optional)
 * limit Long the number of persons to return (optional)
 * returns List
 **/
exports.personsGET = async function(offset, limit) {
    const persons = await sqlDb('person').select('id', 'joining_date', 'role', 'id_thumbnail').offset(offset).limit(limit);
    const personsArray = await Promise.all(persons.map(async person => {
        const thumbnail = await getThumbnailById(person.id_thumbnail);
        return {
            id: person.id,
            thumbnail: thumbnail,
            joining_date: person.joining_date,
            role: person.role
        }
    }));

    return {
        persons: personsArray,
        meta: {
            total_number: (await sqlDb('person').count('id as CNT'))[0]['CNT']
        }
    };

}

