const db = require("../database/index");

postService = {
    getPosts() {
        return new Promise((resolve, reject) => {
            db.connection.query("SELECT*FROM posts", (err, result, fields) => {
                if (err) throw err;
                const error = false
                if (!error)
                    resolve(result);
                else
                    reject(error);
            });
        });
    }
}
module.exports = postService;