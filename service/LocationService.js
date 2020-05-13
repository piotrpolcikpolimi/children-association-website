'use strict';



let sqlDb;


exports.locationDbSetup = function(s) {
    sqlDb = s;
    return sqlDb.schema.hasTable('location').then(exists => {
        if (!exists) {
            console.log('Location table does not exists.');
        } else {
            console.log('Location table exsits.')
        }
    })
}


/**
 * Find location by id
 * Returns a location with a given id
 *
 * id Long id of location to return
 * returns Location
 **/
exports.getLocationById = function(id) {
    return new Promise((resolve, reject) => {
        sqlDb('location').where('id', id)
        .then(location => {
            resolve(location[0]);
        });
    });
}




