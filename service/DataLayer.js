const { serviceDbSetup } = require('./ServicesService');
const { donateDbSetup } = require('./DonationsService');
const { contactDbSetup } = require('./ContactService');
const { eventDbSetup } = require('./EventsService');
const { newsletterDbSetup } = require('./NewslettersService');
const { personDbSetup } = require('./PersonsService');
const { locationDbSetup } = require('./LocationsService');
const { utilsDbSetup } = require('./Utils');

const sqlDbFactory = require('knex');

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
        serviceDbSetup(sqlDb)
    ]
}

module.exports = {
    database: sqlDb,
    setupDataLayer
}