const Sequelize = require('sequelize');
const config = require('../config/config');

/**
 * create sequelize instance
 */
const sequelizeTool = new Sequelize(config.sequelize.DBName, config.sequelize.userName, config.sequelize.password, {
    host: config.sequelize.host,
    dialect: 'mysql',
    dialectOptions: {
        charset: 'utf8mb4'
    },
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci'
    },
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

module.exports = sequelizeTool;