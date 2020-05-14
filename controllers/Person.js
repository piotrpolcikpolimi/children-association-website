'use strict';

var utils = require('../utils/writer.js');
var Person = require('../service/PersonService');

module.exports.getPersonById = function getPersonById (req, res, next) {
  var id = req.swagger.params['id'].value;
  Person.getPersonById(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.personsGET = function personsGET (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  Person.personsGET(offset,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
