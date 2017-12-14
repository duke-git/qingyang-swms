const express = require('express');
const jwt    = require('jsonwebtoken');
const config = require('../config/config');

module.exports = {

    checkToken: function (req, res, next) {
        let token = req.headers['x-access-token'] || req.cookies.token;
        if (token) {
            jwt.verify(token, config.secretkey, function(err, decoded) {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Failed to authenticate token.'
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });

        } else {
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }
    }
}