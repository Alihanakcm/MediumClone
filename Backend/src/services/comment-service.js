var db = require("../database/index");

commentService = {
    postComment(postId, userId, comment) {
        return new Promise((resolve, reject) => {
            db.connection.query(`INSERT INTO comments (comment,post_id,user_id) VALUES ("${comment}",${postId},${userId})`, (err, result, fields) => {
                if (err) throw err;
                const error = false;
                if (!error)
                    resolve(200);
                else
                    reject(error);
            })
        });
    }
}

module.exports=commentService;