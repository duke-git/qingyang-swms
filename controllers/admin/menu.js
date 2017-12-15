const _ = require('lodash');
const menuService = require('../../service/admin/menu');

/**
 * system menus service
 * @returns {promise}
 */
module.exports = {
    saveMenu: menu => {
        return menuService.saveMenu(menu);
    },

    listMenus: (query) => {
        return menuService.listMenus(query);
    },

    getMenuByUser: user => {
        let currentUser = user[0];
        let privilegeId = currentUser ? currentUser.privilegeId : "";

        return new Promise(function (resolve, reject) {
            let res = [];
            let menuItem = {};

            if(!currentUser) {
                resolve(res);
            }else {
                menuService.getMenuByUser(currentUser).then(menus => {
                    let res = [];
                    let menuItem = {};

                    _.map(menus, function (item) {
                        let privilegeIds = item.privilegeIds.split(';');
                        if(privilegeIds.includes(privilegeId)){
                            res.push(item);
                        }
                    });
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            }
        });

    },

    getSubMenus: parentId => {
        menuService.get(parentId);
    }

}