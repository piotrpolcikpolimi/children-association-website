'use strict';

var utils = require('../utils/writer.js');
var Donate = require('../service/DonationsService');

module.exports.donatePost = function donatePOST(req, res, next) {
    var amount = req.swagger.params['amount'].value;
    var message = req.swagger.params['message'].value;
    Donate.donatePost(amount, message)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.getDonations = function getDonations(req, res, next) {
    Donate.getDonations()
        .then(function (response) {
            if (response.length === 0) {
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
