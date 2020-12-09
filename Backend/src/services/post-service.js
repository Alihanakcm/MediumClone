const db = require("../database/index");

postService = {
    getPosts() {
        return new Promise((resolve, reject) => {
            db.connection.query("SELECT*FROM posts", (error, result, fields) => {
                if (!error)
                    resolve(result);
                else
                    reject(error.sqlMessage);
            });
        });
    },
    createPost(userId, post) {
        return new Promise((resolve, reject) => {
            db.connection.query(`INSERT INTO posts (content,title,user_id,like_count,comment_count)
             VALUES ("${post.content}","${post.title}",${userId},0,0)`, (error, result, fields) => {
                if (!error)
                    resolve(200);
                else
                    reject(error.sqlMessage);
            });
        });
    }
}
module.exports = postService;