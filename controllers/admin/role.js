const roleService = require('../../service/admin/role');

/**
 * system user service
 * @returns {promise}
 */
module.exports = {
    saveRole: role => {
        return roleService.saveRole(role);
    },

    listRoles: (query) => {
        return roleService.listRoles(query);
    },

    getRoleById: uid => {
        return roleService.getRoleById(uid);
    }

}