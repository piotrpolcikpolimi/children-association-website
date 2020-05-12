'use strict';


/**
 * All available testimonials
 * Returns list of all the testimonials
 *
 * offset Long offset of the number of testimonials to return (optional)
 * limit Long the number of testimonials to return (optional)
 * returns List
 **/

let sqlDb;

exports.testimonialDbSetup = function(s) {
    sqlDb = s;
    return sqlDb.schema.hasTable('testimonial').then(exists => {
        if (!exists) {
            console.log('Testimonial table does not exists.');
        } else {
            console.log('Testimonial table exsits.')
        }
    })
}


exports.testimonialsGET = function(offset,limit) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "testimonial" : "testimonial",
  "person_desc" : "person_desc",
  "photo" : "http://example.com/aeiou",
  "id" : 6
}, {
  "testimonial" : "testimonial",
  "person_desc" : "person_desc",
  "photo" : "http://example.com/aeiou",
  "id" : 6
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

exports.getTestimonialById = function(id) {
    return sqlDb('testimonial').where('id', id);
}

