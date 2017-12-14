const User = require('../../models/user');

/**
 * 系统用户管理
 * @returns {promise}
 */
module.exports = {
    saveUser: user => {
        return User.sync().then(() => {
            return User.create({
                uid: user.uid,
                name: user.name,
                password: user.password,
                email: user.email
            });
        });
    },

    listUser: (query) => {
        let params = {
            where: query
        };
        return User.sync().then(function () {
            return User.findAll(params);
        });
    },
    getUserByEmail: email => {
        let params = {
            where: {
                email: email
            }
        };
        return User.sync().then(function () {
            return User.findAll(params);
        });
    },
    getUserById: uid => {
        let params = {
            where: {
                uid: uid
            }
        };
        return User.sync().then(function () {
            return User.findAll(params);
        });
    }

}