const db = require("../database/index");

userService = {
    getUser(id) {
        return new Promise((resolve, reject) => {
            db.connection.query("SELECT*FROM users WHERE id=" + id, (err, result, fields) => {
                if (err) throw err;
                const error = false;

                if (!error)
                    resolve(result);
                else
                    reject(error);
            });

        });
    }
}

module.exports = userService;