const Sequelize = require('sequelize');
const sequelizeTool = require('./sequelize');
const Role = require('./role');

/**
 * 系统菜单管理
 * @type {*|{charset, collate}}
 */
const Menu = sequelizeTool.define('menu', {
    uid: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    parentId: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'parent_id'
    },
    roleId: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'role_id',
        references: {
            model: Role,
            key:   'uid'
        }
    },
    privilegeIds: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'privilege_ids'
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    label: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    url: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    status: {
        type: Sequelize.STRING,
        allowNull: true,
    }

}, {charset: "utf8"});

module.exports = Menu;

