'use strict';


/**
 * Donation form
 * A really simplified endpoint imitating donation service.
 *
 * amount Double 
 * message String 
 * no response value expected for this operation
 **/

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

exports.donatePOST = function(amount,message) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

