const { serviceDbSetup } = require('./ServiceService');
const { donateDbSetup } = require('./DonateService');
const { contactDbSetup } = require('./ContactService');
const { eventDbSetup } = require('./EventService');
const { newsletterDbSetup } = require('./NewsletterService'); 
const { personDbSetup } = require('./PersonService'); 
const { testimonialDbSetup } = require('./TestimonialsService'); 
const { thumbnailDbSetup } = require('./ThumbnailService'); 
const { locationDbSetup } = require('./LocationService'); 

const sqlDbFactory = require('knex');

let sqlDb = sqlDbFactory({
    debug: true,
    client: 'pg',
    connection: process.env.DATABASE_URL,
    ssl: false
});


function setupDataLayer() {
    return [
        locationDbSetup(sqlDb),
        thumbnailDbSetup(sqlDb),
        testimonialDbSetup(sqlDb),
        personDbSetup(sqlDb),
        newsletterDbSetup(sqlDb),
        eventDbSetup(sqlDb),
        contactDbSetup(sqlDb),
        donateDbSetup(sqlDb),
        serviceDbSetup(sqlDb)
    ]
}

module.exports = {
    database: sqlDb,
    setupDataLayer
}