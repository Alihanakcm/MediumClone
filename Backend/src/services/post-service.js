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
    },
    createPost(post) {
        return new Promise((resolve, reject) => {
            db.connection.query(`INSERT INTO posts (content,user_id,like_count,comment_count)
             VALUES ("${post.content}",${post.user_id},0,0)`, (err, result, fields) => {
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
module.exports = postService;