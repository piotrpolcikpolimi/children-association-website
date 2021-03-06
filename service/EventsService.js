'use strict';

let sqlDb;
let { getThumbnailById,
    getTestimonialById,
    getServiceThumbnailById,
    getPersonThumbnailById } = require('./Utils'),
    { getLocationById } = require('./LocationsService');


exports.eventDbSetup = function (s) {
    sqlDb = s;
    return sqlDb.schema.hasTable('event').then(exists => {
        if (!exists) {
            console.log('Event table does not exists.');
        } else {
            console.log('Event table exsits.')
        }
    })
}

/**
 * All available events
 * Returns list of all the events
 *
 * offset Long offset of the number of events to return (optional)
 * limit Long the number of services to return (optional)
 * returns List
 **/
exports.getEvents = async function (offset, limit, country, month) {
    let events, total_number
    if (!offset) offset = 0;
    if (!limit) limit = 8;

    if (country) {
        events = (await sqlDb.raw(`SELECT e.id, e.id_thumbnail, e.id_location 
                                    FROM event AS e, location AS l
                                    WHERE e.id_location = l.id AND
                                    l.country = '${country}'
                                    LIMIT ${limit}
                                    OFFSET ${offset};`))['rows'];
        total_number = (await sqlDb.raw(`SELECT COUNT (*) 
                                            FROM event AS e, location AS l
                                            WHERE e.id_location = l.id AND
                                            l.country = '${country}'`))['rows'][0]['count'];
    } else if (month) {
        events = (await sqlDb.raw(`SELECT e.id, e.id_thumbnail, e.id_location 
                                       FROM event as e 
                                       WHERE extract('month' from  e.date_time) = ${month}
                                       LIMIT ${limit}
                                       OFFSET ${offset};`))['rows'];
        total_number = (await sqlDb.raw(`SELECT COUNT (*) FROM event
                                            WHERE extract('month' from  date_time) = ${month}`))['rows'][0]['count'];
    } else {
        events = await sqlDb('event').select('id', 'id_thumbnail', 'id_location').offset(offset).limit(limit);
        total_number = (await sqlDb('event').count('id as CNT'))[0]['CNT'];
    }

    const eventsArray = await Promise.all(events.map(async event => {
        const [thumbnail, location] = await Promise.all([
            getThumbnailById(event.id_thumbnail),
            getLocationById(event.id_location)
        ]);
        return {
            id: event.id,
            thumbnail: thumbnail,
            location: location
        }
    }));

    return {
        events: eventsArray,
        meta: {
            total_number: total_number
        }
    };
}

/**
 * Find an event by id
 * Returns an event with a given id
 *
 * id Long id of event to return
 * country String country that the events should be filtered on (optional)
 * month Long a month to filter the events on (optional)
 * returns Event
 **/
exports.getEventById = async function (id) {
    let event = (await sqlDb('event').where('id', id).select('id', 'name', 'description', 'price', 'date_time', 'id_thumbnail', 'id_location', 'id_person'))[0];
    let [thumbnail, location, manager, services, testimonials, statistics] = await Promise.all([
        getThumbnailById(event.id_thumbnail),
        getLocationById(event.id_location),
        getPersonThumbnailById(event.id_person),
        sqlDb('event_service').where('id_event', event.id).select('id_service'),
        sqlDb('event_testimonial').where('id_event', event.id).select('id_testimonial'),
        sqlDb('previous_years_statistics').where('id', event.id).select('n_children', 'n_contributors', 'amount')
    ]);

    event.location = location;
    event.thumbnail = thumbnail;
    event.manager = manager;
    event.statistics = statistics[0];

    [event.services, event.testimonials] = await Promise.all([
        Promise.all(services.map(service => getServiceThumbnailById(service.id_service))),
        Promise.all(testimonials.map(testimonial => getTestimonialById(testimonial.id_testimonial)))
    ]);

    delete event['id_location'];
    delete event['id_thumbnail'];
    delete event['id_person']

    return event;
}

