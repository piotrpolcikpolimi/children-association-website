'use strict';

var utils = require('../utils/writer.js');
var Location = require('../service/LocationService');

module.exports.locationsGET = function locationsGET (req, res, next) {
  Location.locationsGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
