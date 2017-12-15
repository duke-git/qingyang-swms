const userService = require('../../service/admin/user');

module.exports = {
    saveUser: user => {
        return userService.saveUser(user);
    },

    listUsers: (query) => {
        return userService.listUsers(query);
    },
    getUserByEmail: email => {
        return userService.getUserByEmail(email);
    },
    getUserById: uid => {
        return userService.getUserById(uid);
    }

}