const db = require("../database/index");
const tokenOperations = require("./token-operations/index");
require("dotenv").config({ path: "../../../.env" })

userService = {
    getUser(id) {
        return new Promise((resolve, reject) => {
            db.connection.query("SELECT*FROM users WHERE id=" + id, (error, result, fields) => {
                if (!error)
                    resolve(result);
                else
                    reject(error.sqlMessage);
            });
        });
    },
    register(user) {
        return new Promise((resolve, reject) => {
            db.connection.query(`INSERT INTO users (username,email,fullName,password) 
            VALUES 
            ( "${user.username}","${user.email}", "${user.fullName}", "${user.password}")`, (error, result, fields) => {
                if (!error)
                    resolve(200);
                else if (error.code == 'ER_DUP_ENTRY') {
                    resolve(error.sqlMessage.split(' ')[5].split('.')[1].replace("'", "") + " is exist");
                }
                else {
                    reject(error.sqlMessage);
                }
            });
        });
    },
    login(user) {
        return new Promise((resolve, reject) => {
            db.connection.query(`SELECT username,password 
            FROM users 
            WHERE email="${user.email}" and password="${user.password}"`, (error, result, fields) => {
                if (!error && result.length > 0) {
                    const token = tokenOperations.generateToken(user);
                    resolve({ token: token });
                }
                else if (!error && result.length < 1)
                    resolve(401);
                else
                    reject(error.sqlMessage);
            });
        })
    }
}

module.exports = userService;