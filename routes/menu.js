const express = require('express');
const router = express.Router();
const jwt    = require('jsonwebtoken');
const config = require('../config/config');
const userCtrl = require('../service/admin/user');
const menuCtrl = require('../controllers/admin/menu');
const util = require('../utils/util');

/**
 * /api/menus => method: get; desc: query all menus by current user; return: menus array
 */
router.route('/menus')
    .get( function(req, res, next) {
        let token = req.headers['x-access-token'] || req.cookies.token || req.query.token;

        if (!token) {
            res.status(400).send({
                success: false,
                message: 'Params token is required'
            });
            return;
        }

        jwt.verify(token, config.secretkey, function(err, decoded) {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                let userId = decoded.uid;
                userCtrl.getUserById(userId).then(user => {
                    return menuCtrl.getMenuByUser(user);
                }).then(menus => {
                    res.send({
                        success: true,
                        message:"Success to query menus",
                        data: menus
                    });
                }).catch(err => {
                    res.send({
                        success:false,
                        message:"Failed to save user item " + err
                    });
                });

            }
        });
    })
    .post( function(req, res, next) {
        let {roleId, privilegeIds, name, parentId, label, url, status} = req.body;

        if (!roleId || !privilegeIds || !name || !label) {
            res.status(400).send({
                success: false,
                message: 'Params roleId, privilegeIds, name, label are required'
            });
            return;
        }

        let uid = util.uuid();
        let menu = {uid, roleId, privilegeIds, name, parentId, label, url, status};

        menuCtrl.saveMenu(menu).then(result => {
            res.send({
                success: true,
                message:"Success to save menu item",
                data: result
            });
        }).catch(err => {
            res.status(500).send({
                success:false,
                message:"Failed to save menu item " + err
            });
        });

    });

    module.exports = router;