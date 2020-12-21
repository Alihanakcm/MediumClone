var db = require("../database/index");

likeService = {
    likePost(postId, username) {
        return new Promise((resolve, reject) => {
            db.connection.query(`INSERT INTO likes (postId,username) VALUES (${postId},"${username}") `, (error, result, fields) => {
                if (!error) {
                    this.likeCountIncrease(postId);
                    resolve(200);
                } else
                    reject(error.sqlMessage);
            });

        });
    },
    removeLike(postId, username) {
        return new Promise((resolve, reject) => {
            db.connection.query(`DELETE FROM likes WHERE postId=${postId} and username="${username}"`, (error, result, fields) => {
                if (!error) {
                    this.likeCountDecrease(postId);
                    resolve(200);
                } else
                    reject(error.sqlMessage);
            });
        });
    },
    getIsLiked(postId, username) {
        return new Promise((resolve, reject) => {
            db.connection.query(`SELECT*FROM likes WHERE postId=${postId} and username="${username}"`, (error, result, fields) => {
                if (!error && result.length > 0)
                    resolve(true);
                else if (!error) {
                    resolve(false);
                } else
                    reject(error.sqlMessage);
            });
        });
    },
    likeCountIncrease(postId) {
        return new Promise((resolve, reject) => {
            db.connection.query(`UPDATE posts set likeCount=likeCount+1 WHERE id=${postId}
        `, (error, result, fields) => {
                if (!error)
                    resolve(result);
                else
                    reject(error.sqlMessage);
            })
        });
    },
    likeCountDecrease(postId) {
        return new Promise((resolve, reject) => {
            db.connection.query(`UPDATE posts set likeCount=likeCount-1 WHERE id=${postId}
        `, (error, result, fields) => {
                if (!error)
                    resolve(result);
                else
                    reject(error.sqlMessage);
            })
        });
    }
}

module.exports = likeService;