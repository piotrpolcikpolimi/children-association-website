'use strict';

var utils = require('../utils/writer.js');
var Contact = require('../service/ContactService');


module.exports.sendContactFormPOST = function sendContactFormPOST(req, res, next) {
    var email = req.swagger.params['email'].value;
    var name = req.swagger.params['name'].value;
    var message = req.swagger.params['message'].value;
    Contact.sendContactFormPOST(email, name, message)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};
