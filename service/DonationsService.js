'use strict';

let sqlDb;

exports.donateDbSetup = function(s) {
    sqlDb = s;
    return sqlDb.schema.hasTable('donation').then(exists => {
        if (!exists) {
            console.log('Donation table does not exists.');
        } else {
            console.log('Donation table exsits.')
        }
    })
}

/**
 * Donation form
 * A really simplified endpoint imitating donation service.
 *
 * amount Double 
 * message String 
 * no response value expected for this operation
 **/
exports.donatePost = function(amount, message) {
    return sqlDb('donation').insert({amount: amount, practical_info: message}).then(rsp => {
        return {};
    });
    
}


/**
 * Get all donations
 * An endpoint that allows to see all donations.
 *
 * returns List
 **/
exports.getDonations = function() {
  return sqlDb('donation');
}

