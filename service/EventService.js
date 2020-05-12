'use strict';

let sqlDb;
let { getThumbnailById } = require('./ThumbnailService'),
    { getLocationById } = require('./LocationService');


exports.eventDbSetup = function(s) {
    sqlDb = s;
    return sqlDb.schema.hasTable('event').then(exists => {
        if (!exists) {
            console.log('Event table does not exists.');
        } else {
            console.log('Event table exsits.')
        }
    })
}

/**
 * All available events
 * Returns list of all the events
 *
 * offset Long offset of the number of events to return (optional)
 * limit Long the number of services to return (optional)
 * returns List
 **/

exports.eventsGET = async function(offset,limit) {
    const events = await sqlDb('event').select('id', 'id_thumbnail', 'id_location').offset(offset).limit(limit);
    const eventsArray = await Promise.all(events.map(async event => {
        const [ thumbnail, location ] = await Promise.all([
            getThumbnailById(event.id_thumbnail),
            getLocationById(event.id_location)
        ]);
        return {
            id: event.id,
            thumbnail: thumbnail[0],
            location: location[0]
        }
    }));

    return {
        events: eventsArray,
        meta: {
            total_number: await sqlDb('event').count('id as CNT')
        }
    };
}


/**
 * Find an event by id
 * Returns an event with a given id
 *
 * id Long id of event to return
 * country String country that the events should be filtered on (optional)
 * month Long a month to filter the events on (optional)
 * returns Event
 **/
exports.getEventById = function(id,country,month) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "thumbnail" : {
    "thumbnail_desc" : "thumbnail_desc",
    "thumbnail" : "thumbnail",
    "id" : 6,
    "title" : "title"
  },
  "manager" : {
    "joining_date" : "2000-01-23",
    "thumbnail" : {
      "thumbnail_desc" : "thumbnail_desc",
      "thumbnail" : "thumbnail",
      "id" : 6,
      "title" : "title"
    },
    "role" : "role",
    "meta" : {
      "total_number" : 1
    }
  },
  "description" : "http://example.com/aeiou",
  "services" : [ {
    "thumbnail" : {
      "thumbnail_desc" : "thumbnail_desc",
      "thumbnail" : "thumbnail",
      "id" : 6,
      "title" : "title"
    },
    "id" : 0
  }, {
    "thumbnail" : {
      "thumbnail_desc" : "thumbnail_desc",
      "thumbnail" : "thumbnail",
      "id" : 6,
      "title" : "title"
    },
    "id" : 0
  } ],
  "testimonials" : [ {
    "testimonial" : "testimonial",
    "person_desc" : "person_desc",
    "photo" : "http://example.com/aeiou",
    "id" : 6
  }, {
    "testimonial" : "testimonial",
    "person_desc" : "person_desc",
    "photo" : "http://example.com/aeiou",
    "id" : 6
  } ],
  "date_time" : "2000-01-23T04:56:07.000+00:00",
  "price" : 6.027456183070403,
  "person" : {
    "joining_date" : "2000-01-23",
    "thumbnail" : {
      "thumbnail_desc" : "thumbnail_desc",
      "thumbnail" : "thumbnail",
      "id" : 6,
      "title" : "title"
    },
    "role" : "role",
    "meta" : {
      "total_number" : 1
    }
  },
  "meta" : {
    "total_number" : 1
  },
  "name" : "name",
  "location" : {
    "country_flag_ico n" : "country_flag_ico n",
    "country" : "country",
    "latitude" : 5.637376656633329,
    "name" : "name",
    "id" : 5,
    "longitude" : 2.3021358869347655
  },
  "id" : 0,
  "previous_years_statistics" : {
    "amount" : 2,
    "n_contributors" : 5,
    "n_children" : 5
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

