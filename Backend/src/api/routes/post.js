const express = require("express");
const app = express();
const services = require("../../services/index");

app.get("/posts", (request, response) => {
    services.postService.getPosts().then(data => {response.send(data); }).catch(err => { console.log(err); })
});

module.exports = app;