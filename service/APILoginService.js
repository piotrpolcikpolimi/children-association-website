'use strict';


'use strict'

const redis = require('redis');
let redis_client;
const { promisify } = require('util');

exports.initializeLoginService = (path)  => {
    redis_client = redis.createClient(path);
    redis_client = promisify(redis_client.get).bind(redis_client);
}

exports.getUserToken = (username, password) => {
    return redis_client(token);
}

/**
 * Login to the api
 * Endpoint for logging in to receive API token
 *
 * body Body 
 * returns inline_response_200_2
 **/
exports.login = async function(body) {
    const user = await redis_client.get(body.username);
}

