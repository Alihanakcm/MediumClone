const { request, response } = require("express");
const express = require("express");
const app = express();
const services = require("../../services/index");

app.get("/posts", (request, response) => {
    services.postService.getPosts().then(data => response.send(data)).catch(err => console.log(err));
});

app.post("/new-post", (request, response) => {
    services.postService.createPost(request.body).then(res => response.send(res)).catch(err => console.log(err));
});

module.exports = app;