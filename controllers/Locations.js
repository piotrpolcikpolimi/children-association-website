'use strict';

var utils = require('../utils/writer.js');
var Location = require('../service/LocationsService');

module.exports.getLocations = function locationsGET(req, res, next) {
    Location.getLocations()
        .then(function (response) {
            if (response.length === 0) {
                res.writeHead(404);
                res.end(); 1
            } else {
                utils.writeJson(res, response);
            }
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};
