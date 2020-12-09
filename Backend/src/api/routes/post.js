const { request, response } = require("express");
const express = require("express");
const app = express();
const services = require("../../services/index");
var authToken = require("../middlewares/authentication/index");

app.get("/posts", authToken.authenticateToken, (request, response) => {
    services.postService.getPosts().then(data => response.send(data)).catch(err => console.log(err));
});

app.post("/new-post", authToken.authenticateToken, (request, response) => {
    services.postService.createPost(request.query.userId,request.body).then(res => response.send(res)).catch(err => console.log(err));
});

module.exports = app;