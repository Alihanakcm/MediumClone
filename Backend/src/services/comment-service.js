var db = require("../database/index");

commentService = {
    postComment(postId, userId, comment) {
        return new Promise((resolve, reject) => {
            db.connection.query(`INSERT INTO comments (name,comment,postId,userId) VALUES ("${comment.name}","${comment.comment}",${postId},${userId})`, (error, result, fields) => {
                if (!error) {
                    this.commentCountIncrease(postId);
                    resolve(200);
                } else
                    reject(error.sqlMessage);
            })
        });
    },
    getComments(postId) {
        return new Promise((resolve, reject) => {
            db.connection.query(`SELECT c.id,c.name,c.comment,c.postId,c.commentDate,u.username FROM comments c INNER JOIN users u ON c.userId=u.id WHERE postId=${postId}`, (error, result, fields) => {
                if (!error)
                    resolve(result);
                else
                    reject(error.sqlMessage);
            })
        });
    },
    commentCountIncrease(postId) {
        return new Promise((resolve, reject) => {
            db.connection.query(`UPDATE posts set commentCount=commentCount+1 WHERE id=${postId}
        `, (error, result, fields) => {
                if (!error)
                    resolve(result);
                else
                    reject(error.sqlMessage);
            })
        });
    }
}

module.exports = commentService;