const { request, response } = require("express");
var express = require("express");
var app = express();
var authToken = require("../middlewares/authentication/index");
var services = require("../../services/index");
app.post("/like", authToken.authenticateToken, (request, response) => {
    services.likeService.likePost(request.query.postId, request.query.userId).then(res => response.send(res)).catch(err => console.log(err));
});

app.delete("/like", authToken.authenticateToken, (request, response) => {
    services.likeService.removeLike(request.query.id).then(res => response.send(res)).catch(err => console.log(err))
})

module.exports = app;