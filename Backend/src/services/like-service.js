var db = require("../database/index");

likeService = {
    likePost(postId, userId) {
        return new Promise((resolve, reject) => {
            db.connection.query(`INSERT INTO likes (post_id,user_id) VALUES (${postId},${userId}) `, (error, result, fields) => {
                if (!error)
                    resolve(200);
                else
                    reject(error.sqlMessage);
            });

        });
    },
    removeLike(id) {
        return new Promise((resolve, reject) => {
            db.connection.query(`DELETE FROM likes WHERE id=${id}`, (error, result, fields) => {
                if (!error)
                    resolve(200);
                else
                    reject(error.sqlMessage);
            });
        });
    }
}

module.exports = likeService;