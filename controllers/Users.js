'use strict'

let User = require('../service/UserService');

const getUser = (req) => {
    return User.getUser('token');
};

module.exports = {
    getUser
}