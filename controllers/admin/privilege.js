const privilegeService = require('../../service/admin/privilege');


module.exports = {
    savePrivilege: privilege => {
        return privilegeService.savePrivilege(privilege);
    },

    listPrivilege: (query) => {
        return privilegeService.listPrivilege(query);
    },

    getPrivilegeById: uid => {
        return privilegeService.getPrivilegeById(uid);
    }

}