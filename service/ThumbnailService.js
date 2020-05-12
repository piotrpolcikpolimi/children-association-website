'use strict';

let sqlDb;

exports.thumbnailDbSetup = function (s) {
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
    return sqlDb('thumbnail').where('id', id);
}

