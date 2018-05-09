const User = require('../../models/user');

/**
 * system user service
 * @returns {promise}
 */
module.exports = {
    saveUser: user => {
        return User.sync().then(() => {
            return User.create({
                uid: user.uid,
                roleId: user.roleId,
                privilegeId: user.privilegeId,
                name: user.name,
                password: user.password,
                email: user.email
            });
        });
    },

    listUsers: (query) => {
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
    },

}