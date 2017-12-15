const Privilege = require('../../models/privilege');

/**
 * system privilege service
 * @returns {promise}
 */
module.exports = {
    savePrivilege: privilege => {
        return Privilege.sync().then(() => {
            return Privilege.create({
                uid: privilege.uid,
                roleId: privilege.roleId,
                name: privilege.name,
                type: privilege.type,
                comment: privilege.comment
            });
        });
    },

    listPrivilege: (query) => {
        let params = {
            where: query
        };
        return Privilege.sync().then(function () {
            return Privilege.findAll(params);
        });
    },

    getPrivilegeById: uid => {
        let params = {
            where: {
                uid: uid
            }
        };
        return Privilege.sync().then(function () {
            return Privilege.findAll(params);
        });
    }

}