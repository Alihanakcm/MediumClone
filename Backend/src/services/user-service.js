const db = require("../database/index");
const tokenOperations = require("./token-operations/index");
require("dotenv").config({ path: "../../../.env" })

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
            db.connection.query(`INSERT INTO users (username,email,full_name,password) 
            VALUES 
            ( "${user.username}","${user.email}", "${user.full_name}", "${user.password}")`, (err, result, fields) => {
                if (err) throw err;
                const error = false;
                if (!error)
                    resolve(200);
                else
                    reject(error);
            });
        });
    },
    login(user) {
        return new Promise((resolve, reject) => {
            db.connection.query(`SELECT username,password 
            FROM users 
            WHERE username="${user.username}" and password="${user.password}"`, (err, result, fields) => {
                if (err) throw err;
                const error = false;
                if (!error && result.length > 0) {
                    const token = tokenOperations.generateToken(user);
                    resolve({ token: token });
                }
                else if (!error && result.length < 1)
                    resolve(401);
                else
                    reject(error);
            });
        })
    }
}

module.exports = userService;