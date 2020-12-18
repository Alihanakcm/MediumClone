const db = require("../database/index");

postService = {
    getPosts() {
        return new Promise((resolve, reject) => {
            db.connection.query("SELECT p.id,p.title,p.content,p.likeCount,p.commentCount,p.postDate,u.fullName FROM posts p INNER JOIN users u ON p.userId=u.id", (error, result, fields) => {
                if (!error)
                    resolve(result);
                else
                    reject(error.sqlMessage);
            });
        });
    },
    getPost(postId) {
        return new Promise((resolve, reject) => {
            db.connection.query(`SELECT p.id,p.title,p.content,p.likeCount,p.commentCount,p.postDate,u.fullName,u.id as "userId" FROM posts p INNER JOIN users u ON p.userId=u.id WHERE p.id=${postId}`, (error, result, fields) => {
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