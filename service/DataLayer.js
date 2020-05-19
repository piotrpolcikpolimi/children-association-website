const { serviceDbSetup } = require('./ServiceService');
const { donateDbSetup } = require('./DonateService');
const { contactDbSetup } = require('./ContactService');
const { eventDbSetup } = require('./EventService');
const { newsletterDbSetup } = require('./NewsletterService'); 
const { personDbSetup } = require('./PersonService'); 
const { locationDbSetup } = require('./LocationService');
const { utilsDbSetup } = require('./Utils'); 
const { initializeUserService } = require('./UserService');
const { initializeLoginService } = require('./APILoginService');


const sqlDbFactory = require('knex');
const redis_path = process.env.REDIS_URL;

let sqlDb = sqlDbFactory({
    debug: true,
    client: 'pg',
    connection: process.env.DATABASE_URL,
    ssl: false
});


function setupDataLayer() {
    return [
        utilsDbSetup(sqlDb),
        donateDbSetup(sqlDb),
        locationDbSetup(sqlDb),
        personDbSetup(sqlDb),
        newsletterDbSetup(sqlDb),
        eventDbSetup(sqlDb),
        contactDbSetup(sqlDb),
        donateDbSetup(sqlDb),
        serviceDbSetup(sqlDb),
        initializeUserService(redis_path),
        initializeLoginService(redis_path)
    ]
}

module.exports = {
    database: sqlDb,
    setupDataLayer
}