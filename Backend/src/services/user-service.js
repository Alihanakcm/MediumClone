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
    },
    register(user) {
        return new Promise((resolve, reject) => {
            var sql = `INSERT INTO users (username,email,full_name,password) 
            VALUES 
            ( "${user.username}","${user.email}", "${user.full_name}", "${user.password}")`
            console.log(sql);
            db.connection.query(sql, (err, result, fields) => {
                if (err) throw err;
                const error = false;
                if (!error)
                    resolve(200);
                else
                    reject(error);
            });
        });
    }
}

module.exports = userService;