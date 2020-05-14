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

module.exports.servicesGET = function servicesGET (req, res, next) {
  Service.servicesGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
