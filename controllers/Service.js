'use strict';

var utils = require('../utils/writer.js');
var Service = require('../service/ServiceService');

module.exports.getServiceById = function getServiceById (req, res, next) {
  var id = req.swagger.params['id'].value;
  Service.getServiceById(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getServices = function getServices (req, res, next) {
  Service.getServices()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
