'use strict'

const redis = require('redis');
let redis_client;
const { promisify } = require('util');

exports.initializeUserService = (path)  => {
    redis_client = redis.createClient(path);
    redis_client = promisify(redis_client.get).bind(redis_client);
}

exports.getUser = (token) => {
    return redis_client(token);
}