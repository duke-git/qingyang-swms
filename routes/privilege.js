const express = require('express');
const router = express.Router();

const privilegeCtrl = require('../controllers/admin/privilege');
const util = require('../utils/util');

/**
 * roles operation restful api
 * /api/roles => desc: query all roles; method: get; return: roles array
 * /api/roles => desc: create new role; method: post; return: the added role
 * /api/role:roleId => desc: query a special role by userId; method: get; return: role
 */
router.route('/privilege')
    .post( function(req, res, next) {
        let {roleId, name, type, comment} = req.body;

        if (!roleId || !name || !type) {
            res.status(400).send({
                success: false,
                message: 'Params roleId, name, type are required'
            });
            return;
        }

        let uid = util.uuid();
        let privilege = {uid, roleId, name, type, comment};

        privilegeCtrl.savePrivilege(privilege).then(result => {
            res.send({
                success: true,
                message:"Success to save privilege item",
                data: result
            });
        }).catch(err => {
            res.send({
                success:false,
                message:"Failed to save privilege item " + err
            });
        });

    })
    .get(function(req, res) {
        privilegeCtrl.listPrivilege({}).then(result => {
            res.send({
                success: true,
                message:"Success to query privilege",
                data: result
            });
        }, err => {
            console.log(err);
            res.status(500).send({
                success: false,
                message: 'Failed to query privilege'
            });
        })
    });


router.route('/privilege/:privilegeId')
    .get(function(req, res) {
        privilegeCtrl.getPrivilegeById(req.params.privilegeId).then(result => {
            res.send({
                success: true,
                message:"Success to query privilege",
                data: result
            });
        }, err => {
            console.log(err);
            res.status(500).send({
                success: false,
                message: 'Failed to query privilege'
            });
        })
    });
module.exports = router;