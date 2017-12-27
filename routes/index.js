const proxy = require("express-http-proxy");
const config = require('../config/config');
const loggers = require("../utils/logHelper").helper;
const util = require('../utils/util');
const token = require('../middlewares/token');

const express = require('express');
const jwt    = require('jsonwebtoken');
const userCtrl = require('../service/admin/user');

module.exports = function(app) {

    // basic route
    app.get('/', function(req, res) {
        res.send('Hello! Welcome to our API!');
    })

    /**
     * authenticate a admin
     * /api/authenticate => desc: authenticate admin; method: post; return: token
     */
    app.use('/api/login', function (req, res, next) {

        let {username, password} = req.body;

        userCtrl.getUserByEmail(username).then(ress => {
            let user = ress[0];

            if (!user) {
                res.send({
                    success: false,
                    code: 10001,
                    message: 'Authentication failed. User not found.'
                });
            } else if(user) {
                if(user.password != password) {
                    res.send({
                        success: false,
                        code: 10002,
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
                        success: true,
                        message: 'Authentication success.',
                        token: token
                    });
                }
            }
        }, err => {
            res.status(500).send({
                success: false,
                code: 10003,
                message: 'Authentication failed.' + err
            });
        });
    });

    // role operation
    app.use('/api', require('./role'));
    app.use('/api', require('./privilege'));
    app.use('/api', require('./user'));
    app.use('/api', require('./menu'));

    // user operation
    //app.use('/api', token.checkToken, require('./user'));
};
