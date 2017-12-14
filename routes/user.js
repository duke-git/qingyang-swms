const express = require('express');
const router = express.Router();

const userCtrl = require('../service/user/user');
const util = require('../utils/util');

/**
 * user operation restful api
 * /api/users => desc: query all users; method: get; return: users array
 * /api/users => desc: create new user; method: post; return: the added user
 * /api/user:userId => desc: query a special user by userId; method: get; return: user
 */
router.route('/users')
    .post( function(req, res, next) {
        let {name, password, email} = req.body;

        if (!name || !password || !email) {
            res.status(400).send({
                success: false,
                message: 'Params name, password, email are required'
            });
            return;
        }

        userCtrl.getUserByEmail(email).then(ress => {
            if (ress.length === 0) {
                let uid = util.uuid();
                let user = {uid, name, password, email};

                userCtrl.saveUser(user).then(result => {
                    res.send({
                        success: true,
                        message:"Success to save user item",
                        data: result
                    });
                }).catch(err => {
                    res.send({
                        success:false,
                        message:"Failed to save user item " + err
                    });
                });
            } else {
                res.status(400).send({
                    success: false,
                    message: 'User already exist'
                });
            }
        }, err => {
            res.status(500).send({
                success: false,
                message: 'User already exist' + err
            });
        });
        
    })
    .get(function(req, res) {
        userCtrl.listUser({}).then(result => {
            res.send({
                success: true,
                message:"Success to query user",
                data: result
            });
        }, err => {
            console.log(err);
            res.status(500).send({
                success: false,
                message: 'Failed to query user'
            });
        })
    });

    module.exports = router;