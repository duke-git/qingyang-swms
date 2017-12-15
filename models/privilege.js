const Sequelize = require('sequelize');
const sequelizeTool = require('./sequelize');
const Role = require('./role');

/**
 * system privilege
 * @type {*|{charset, collate}}
 */
const Privilege = sequelizeTool.define('privilege', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    uid: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
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
    type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isIn: [[1, 2, 3]]
        }
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    comment: {
        type: Sequelize.STRING,
        allowNull: true
    }

}, {charset: "utf8"});

module.exports = Privilege;

