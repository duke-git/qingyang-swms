const Sequelize = require('sequelize');
const sequelizeTool = require('./sequelize');

/**
 * system role
 *
 * @type {*|{charset, collate}}
 */
const Role = sequelizeTool.define('role', {
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

module.exports = Role;

