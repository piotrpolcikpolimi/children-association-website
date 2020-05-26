'use strict';


let sqlDb;

exports.newsletterDbSetup = function (s) {
    sqlDb = s;
    return sqlDb.schema.hasTable('donation').then(exists => {
        if (!exists) {
            console.log('Newsletter table does not exists.');
        } else {
            console.log('Newsletter table exsits.')
        }
    })
}

/**
 * Get all newsletter signups
 * An endpoint that allows to see all newsletter signups.
 *
 * returns List
 **/
exports.getNewsletterSignups = function () {
    return sqlDb('newsletter_signups');
}


/**
 * Newsletter signup
 * An endpoint that allows a visitor to signup to the newsletter.
 *
 * email String 
 * no response value expected for this operation
 **/
exports.newsletterSignup = function (email) {
    return sqlDb('newsletter_signups').insert({ email: email }).then(rsp => {
        return {};
    });
}

