'use strict';

var utils = require('../utils/writer.js');
var Person = require('../service/PersonsService');

module.exports.getPersonById = function getPersonById(req, res, next) {
    var id = req.swagger.params['id'].value;
    Person.getPersonById(id)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            res.writeHead(404);
            res.end();
        });
};

module.exports.getPersons = function personsGET(req, res, next) {
    var offset = req.swagger.params['offset'].value;
    var limit = req.swagger.params['limit'].value;
    Person.getPersons(offset, limit)
        .then(function (response) {
            if (response.persons.length === 0) {
                res.writeHead(404);
                res.end();
            } else {
                utils.writeJson(res, response);
            }
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};
