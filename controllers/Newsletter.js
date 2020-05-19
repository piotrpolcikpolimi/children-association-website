'use strict';

const utils = require('../utils/writer.js');
const Newsletter = require('../service/NewsletterService');
const User = require('./Users');
const roles = require('../_helpers/roles');
const authorize = require('../_helpers/authorize');


module.exports.getNewsletterSignups = function getNewsletterSignups(req, res, next) {
    User.getUser(req).then((current_user) => {
        if (!current_user || !authorize(current_user, roles.Moderator)) {
            res.writeHead(401);
            res.end();
            return;
        }
        Newsletter.getNewsletterSignups()
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
    })

};

module.exports.newsletterSignup = function newsletterSignup(req, res, next) {
    var email = req.swagger.params['email'].value;
    Newsletter.newsletterSignup(email)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};
