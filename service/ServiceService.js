'use strict';

let sqlDb;
let { getThumbnailById } = require('./ThumbnailService'),
    { getLocationById } = require('./LocationService');

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
    let service = (await sqlDb('service').where('id', id).select('id', 'name', 'center_activities', 'description', 'practical_info', 'header_photo', 'cta'))[0],
        [testimonials, events] = await Promise.all([sqlDb('service_testimonial').where('id_service', id).select('id_testimonial'),
                sqlDb('event_service').where('id_service', id).select('id_event')]);

    testimonials = Promise.all(testimonials.map(async t => {
        return sqlDb('testimonial').where('id', t.id_testimonial).first();
    }));

    events = await Promise.all(events.map(async e => {
        return sqlDb('event').where('id', e.id_event).select('id', 'id_thumbnail', 'id_location');
    }));

    events = Promise.all(events.map(async e => {
        const [ thumbnail, location ] = await Promise.all([
            getThumbnailById(e[0].id_thumbnail),
            getLocationById(e[0].id_location)
        ]);
        return {
            id: e[0].id,
            thumbnail: thumbnail[0],
            location: location[0]
        }
    }));

    [ testimonials, events ] = await Promise.all([testimonials, events]);

    service.testimonials = testimonials.map(testimonial => testimonial);
    service.events = events;

    return service;
}


/**
 * All available services
 * Returns list of all services
 *
 * returns List
 **/
exports.servicesGET = async function() {
  const services = await sqlDb('service').select('id', 'id_thumbnail');
  return Promise.all(services.map(async service => {
      const thumbnail = await getThumbnailById(service.id_thumbnail);
      return {
          id: service.id,
          thumbnail: thumbnail[0]
      }
  }));
}


