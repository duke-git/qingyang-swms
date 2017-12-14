const Sequelize = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config.sequelize.DBName, config.sequelize.userName, config.sequelize.password, {
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

const User = sequelize.define('user', {
    uid: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
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
    type: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
}, {charset: "utf8"});

module.exports = User;

