'use strict';

const utils = require('../utils/writer.js');
const Service = require('../service/ServiceService');
const User = require('./Users');
const roles = require('../_helpers/roles');

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
