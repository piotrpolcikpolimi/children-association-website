'use strict';

var utils = require('../utils/writer.js');
var Newsletter = require('../service/NewsletterService');

module.exports.newsletterSignup = function newsletterSignup (req, res, next) {
  var email = req.swagger.params['email'].value;
  Newsletter.newsletterSignup(email)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
