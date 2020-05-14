'use strict';

let sqlDb;
const { getLocationById } = require('./LocationService');

exports.utilsDbSetup = function (s) {
    sqlDb = s;
    return sqlDb.schema.hasTable('thumbnail').then(exists => {
        if (!exists) {
            console.log('Thumbnail table does not exists.');
        } else {
            console.log('Thumbnail table exsits.')
        }
    })
}

/**
 * Find a thumbnail by id
 * Returns a thumbnail with a given id
 *
 * id Long id of thumbnail to return
 * returns Thumbnail
 **/

exports.getThumbnailById = function (id) {
    return new Promise((resolve, reject) => {
        sqlDb('thumbnail').where('id', id)
        .then(thumbnail => {
            resolve(thumbnail[0]);
        });
    });
}

exports.getTestimonialById = function(id) {
    return new Promise((resolve, reject) => {
        sqlDb('testimonial').where('id', id)
        .then(testimonial => {
            resolve(
                testimonial[0]
            )
        })
    });
}

exports.getServiceThumbnailById = function(id) {
    return new Promise((resolve, reject) => {
        sqlDb('service').where('id', id).select('id', 'id_thumbnail')
        .then(service => {
            module.exports.getThumbnailById(service[0].id_thumbnail)
            .then(thumbnail => {
                resolve({
                    id: service[0].id,
                    thumbnail: thumbnail
                })
            })
        })
    })
}

exports.getEventThumbnailById = function(id) {
    return new Promise((resolve, reject) => {
        sqlDb('event').where('id', id).select('id', 'id_thumbnail', 'id_location')
        .then(event => {
            module.exports.getThumbnailById(event[0].id_thumbnail)
            .then(thumbnail => {
                getLocationById(event[0].id_location)
                .then(location => {
                    resolve({
                        id: event[0].id,
                        thumbnail: thumbnail,
                        location: location
                    })
                })
            })
        })
    });
}

exports.getPersonThumbnailById = function(id) {
    return new Promise((resolve, reject) => {
        sqlDb('person').where('id',id).select('id', 'joining_date', 'role', 'id_thumbnail')
        .then(person => {
            module.exports.getThumbnailById(person[0].id_thumbnail)
            .then(thumbnail => {
                resolve({
                    id: person[0].id,
                    thumbnail: thumbnail,
                    joining_date: person[0].joining_date,
                    role: person[0].role
                });
            })
        })
    })
}

