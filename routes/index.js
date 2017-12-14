const proxy = require("express-http-proxy");
const config = require('../config/config');
const loggers = require("../utils/logHelper").helper;
const util = require('../utils/util');
const token = require('../middlewares/token');

const express = require('express');
const jwt    = require('jsonwebtoken');
const userCtrl = require('../service/user/user');

module.exports = function(app) {

    // basic route
    app.get('/', function(req, res) {
        res.send('Hello! Welcome to our API!');
    })

    /**
     * authenticate a user
     * /api/authenticate => desc: authenticate usermethod: post; return: user token
     */
    app.use('/api/authenticate', function (req, res, next) {
        let {name, password} = req.body;

        userCtrl.getUserByEmail(name).then(ress => {
            let user = ress[0];

            if (!user) {
                res.send({
                    success: false,
                    message: 'Authentication failed. User not found.'
                });
            } else if(user) {
                if(user.password != password) {
                    res.send({
                        success: false,
                        message: 'Authentication failed. Wrong password.'
                    });
                }else {
                    const payload = {
                        uid: user.uid
                    };

                    let token = jwt.sign(payload, config.secretkey, {
                        expiresIn: '24h' // expires in 24 hours
                    });

                    res.cookie('token', token, { expires: new Date(Date.now() + 900000)});
                    res.send({
                        success: false,
                        message: 'Authentication success.',
                        token: token
                    });
                }
            }
        }, err => {
            res.status(500).send({
                success: false,
                message: 'Authentication failed. Wrong password.' + err
            });
        });
    });
    
    // user operation
    app.use('/api', token.checkToken, require('./user'));
};
