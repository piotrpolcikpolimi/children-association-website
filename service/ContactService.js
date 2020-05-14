'use strict';


/**
 * Send a contact form
 * Receive data that are conversed into an e-mail sent to the website contact e-mail address
 *
 * email String 
 * name String 
 * message String 
 * no response value expected for this operation
 **/
let sqlDb;

exports.contactDbSetup = function(s) {
    sqlDb = s;
    return sqlDb.schema.hasTable('contact').then(exists => {
        if (!exists) {
            console.log('Contact table does not exists.');
        } else {
            console.log('Contact table exsits.')
        }
    })
}


exports.sendContactFormPOST = function(email,name,message) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

