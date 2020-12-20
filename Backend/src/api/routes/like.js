const {
    request,
    response
} = require("express");
var express = require("express");
var app = express();
var authToken = require("../middlewares/authentication/index");
var services = require("../../services/index");
app.post("/like", authToken.authenticateToken, (request, response) => {
    services.likeService.likePost(request.query.postId, request.query.username).then(res => response.send({
        res
    })).catch(err => console.log(err));
});

app.delete("/like", authToken.authenticateToken, (request, response) => {
    services.likeService.removeLike(request.query.postId, request.query.username).then(res => response.send({
        res
    })).catch(err => console.log(err))
});

app.get("/like", authToken.authenticateToken, (request, response) => {
    services.likeService.getIsLiked(request.query.postId, request.query.username).then(res => response.send({
        res
    })).catch(err => console.log(err))
})

module.exports = app;