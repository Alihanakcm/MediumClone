var express = require("express");

var app = express();
var services = require("../../services/index");
var authToken = require("../middlewares/authentication/index");
app.post("/comment", authToken.authenticateToken, (request, response) => {
    services.commentService.postComment(request.query.postId, request.query.userId, request.body).then(res => response.send({
        res
    })).catch(err => console.log(err));
});
app.get("/comments", authToken.authenticateToken, (request, response) => {
    services.commentService.getComments(request.query.postId).then(res => response.send(res)).catch(err => console.log(err));
})

module.exports = app;