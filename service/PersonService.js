'use strict';

let sqlDb;
let { getThumbnailById } = require('./Utils');

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
exports.getPersonById = function(id) {
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

