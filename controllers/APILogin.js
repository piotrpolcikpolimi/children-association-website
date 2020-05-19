'use strict';

var utils = require('../utils/writer.js');
var APILogin = require('../service/APILoginService');

module.exports.login = function login (req, res, next) {
  var body = req.swagger.params['body'].value;
  APILogin.login(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
