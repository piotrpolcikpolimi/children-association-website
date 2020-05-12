'use strict';

let sqlDb;
let { getThumbnailById } = require('./ThumbnailService');

exports.serviceDbSetup = function(s) {
    sqlDb = s;
    return sqlDb.schema.hasTable('service').then(exists => {
        if (!exists) {
            console.log('Service table does not exists.');
        } else {
            console.log('Service table exsits.')
        }
    })
}

/**
 * Find a service by id
 * Returns a service with a given id
 *
 * id Long id of service to return
 * returns Service
 **/
exports.getServiceById = async function(id) {
    return await sqlDb('service').where('id', id);
}


/**
 * All available services
 * Returns list of all services
 *
 * returns List
 **/
exports.servicesGET = async function() {
  const services = await sqlDb('service').select('id','id_thumbnail');
  return Promise.all(services.map(async service => {
      const thumbnail = await getThumbnailById(service.id_thumbnail);
      return {
          id: service.id,
          thumbnail: thumbnail[0]
      }
  }));
}


