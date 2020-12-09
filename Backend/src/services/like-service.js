var db = require("../database/index");

likeService = {
    likePost(postId, userId) {
        return new Promise((resolve, reject) => {
            db.connection.query(`INSERT INTO likes (post_id,user_id) VALUES (${postId},${userId}) `, (err, result, fields) => {
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

module.exports = likeService;