const Sequelize = require('sequelize');
const sequelizeTool = require('./sequelize');
const Role = require('./role');
const Privilege = require('./privilege');

/**
 * 系统用户管理
 * @type {*|{charset, collate}}
 */
const User = sequelizeTool.define('user', {
    uid: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
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
    privilegeId: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'privilege_id',
        references: {
            model: Privilege,
            key:   'uid'
        }
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
}, {charset: "utf8"});

module.exports = User;

