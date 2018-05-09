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

        let privilegeId = user ? user.privilegeId : "";

        return new Promise(function (resolve, reject) {
            let res = [];
            if(!privilegeId) {
                resolve(res);
            }else {
                menuService.listMenus({}).then(menus => {
                    let res = [];
                    _.map(menus, function (item) {
                        let privilegeIds = item.privilegeIds.split(';');
                        if(privilegeIds.includes(privilegeId)){
                            res.push(item.url);
                        }
                    });
                    resolve(res);
                }).catch(err => {
                    reject(err);
                });
            }
        });
    },

    getSubMenus: parentId => {
        menuService.get(parentId);
    }

}