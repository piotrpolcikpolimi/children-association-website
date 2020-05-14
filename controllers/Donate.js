'use strict';

var utils = require('../utils/writer.js');
var Donate = require('../service/DonateService');

module.exports.donatePOST = function donatePOST (req, res, next) {
  var amount = req.swagger.params['amount'].value;
  var message = req.swagger.params['message'].value;
  Donate.donatePOST(amount,message)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
