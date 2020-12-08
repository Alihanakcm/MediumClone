const { request, response } = require("express");
const express = require("express");
const app = express();
const services = require("../../services/index");

app.get("/user/:id", (request, response) => {
    services.userService.getUser(request.params.id).then(data => response.send(data)).catch(err => console.log(err));
});

app.post("/register", (request, response, next) => {
    services.userService.register(request.body).then(res => response.send(res)).catch(err => console.log(err))
});

module.exports = app;