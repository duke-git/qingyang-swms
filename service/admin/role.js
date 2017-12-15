const Role = require('../../models/role');

/**
 * system user service
 * @returns {promise}
 */
module.exports = {
    saveRole: role => {
        return Role.sync().then(() => {
            return Role.create({
                uid: role.uid,
                name: role.name,
                type: role.type,
                comment: role.comment
            });
        });
    },

    listRoles: (query) => {
        let params = {
            where: query
        };
        return Role.sync().then(function () {
            return Role.findAll(params);
        });
    },

    getRoleById: uid => {
        let params = {
            where: {
                uid: uid
            }
        };
        return Role.sync().then(function () {
            return Role.findAll(params);
        });
    }

}