'use strict';

var utils = require('../utils/writer.js');
var Testimonials = require('../service/TestimonialsService');

module.exports.testimonialsGET = function testimonialsGET (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  Testimonials.testimonialsGET(offset,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
