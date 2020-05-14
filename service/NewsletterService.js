'use strict';


/**
 * Newsletter signup
 * An endpoint that allows a visitor to signup to the newsletter.
 *
 * email String 
 * no response value expected for this operation
 **/

let sqlDb;

exports.newsletterDbSetup = function(s) {
    sqlDb = s;
    return sqlDb.schema.hasTable('newsletter_signups').then(exists => {
        if (!exists) {
            console.log('Newsletter table does not exists.');
        } else {
            console.log('Newsletter table exsits.')
        }
    })
}


exports.newsletterSignup = function(email) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

