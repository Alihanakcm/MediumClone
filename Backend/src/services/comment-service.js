var db = require("../database/index");

commentService = {
    postComment(postId, userId, comment) {
        console.log(comment.name);
        console.log(comment.comment);
        return new Promise((resolve, reject) => {
            db.connection.query(`INSERT INTO comments (name,comment,postId,userId) VALUES ("${comment.name}","${comment.comment}",${postId},${userId})`, (error, result, fields) => {
                if (!error)
                    resolve(200);
                else
                    reject(error.sqlMessage);
            })
        });
    }
}

module.exports=commentService;