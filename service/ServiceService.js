'use strict';

let sqlDb;
let { getThumbnailById, 
        getTestimonialById, 
        getEventThumbnailById  } = require('./Utils');

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
    let service = (await sqlDb('service').where('id', id).select('id', 'name', 'center_activities', 'description', 'practical_info', 'header_photo', 'cta'))[0];
    let [testimonials, events] = await Promise.all([sqlDb('service_testimonial').where('id_service', id).select('id_testimonial'),
                sqlDb('event_service').where('id_service', id).select('id_event')]);

    service.testimonials = await Promise.all(testimonials.map(t => {
        return getTestimonialById(t.id_testimonial);
    }));

    service.events = await Promise.all(events.map(e => {
        return getEventThumbnailById(e.id_event);
    }));

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
          thumbnail: thumbnail
      }
  }));
}


