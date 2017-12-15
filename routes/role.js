const express = require('express');
const router = express.Router();

const roleCtrl = require('../controllers/admin/role');
const util = require('../utils/util');

/**
 * roles operation restful api
 * /api/roles => desc: query all roles; method: get; return: roles array
 * /api/roles => desc: create new role; method: post; return: the added role
 * /api/role:roleId => desc: query a special role by userId; method: get; return: role
 */
router.route('/roles')
    .post( function(req, res, next) {
        let {name, type, comment} = req.body;

        if (!name || !type) {
            res.status(400).send({
                success: false,
                message: 'Params name, type are required'
            });
            return;
        }

        let uid = util.uuid();
        let role = {uid, name, type, comment};

        roleCtrl.saveRole(role).then(result => {
            res.send({
                success: true,
                message:"Success to save role item",
                data: result
            });
        }).catch(err => {
            res.send({
                success:false,
                message:"Failed to save role item " + err
            });
        });

    })
    .get(function(req, res) {
        roleCtrl.listRoles({}).then(result => {
            res.send({
                success: true,
                message:"Success to query role",
                data: result
            });
        }, err => {
            console.log(err);
            res.status(500).send({
                success: false,
                message: 'Failed to query role'
            });
        })
    });

module.exports = router;