const Menu = require('../../models/menu');

/**
 * system menus service
 * @returns {promise}
 */
module.exports = {
    saveMenu: menu => {
        return Menu.sync().then(() => {
            return Menu.create({
                uid: menu.uid,
                roleId: menu.roleId,
                privilegeIds: menu.privilegeIds,
                parentId: menu.parentId,
                name: menu.name,
                label: menu.label,
                url: menu.url,
                status: menu.status
            });
        });
    },

    listMenus: (query) => {
        let params = {
            where: query
        };
        return Menu.sync().then(function () {
            return Menu.findAll(params);
        });
    },

    getMenuByUser: user => {
        let params = {
            where: {
                roleId: user.roleId
            }
        };
        return Menu.sync().then(function () {
            return Menu.findAll(params);
        });
    },

    getSubMenus: parentId => {
        let params = {
            where: {
                parentId: parentId
            }
        };
        return Menu.sync().then(function () {
            return Menu.findAll(params);
        });
    }

}