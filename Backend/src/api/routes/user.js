const { request, response } = require("express");
const express = require("express");
const app = express();
const services = require("../../services/index");
const validation = require("../middlewares/validation/index");
const authToken = require("../middlewares/authentication/index");
const { json } = require("body-parser");
app.get("/user/:id", authToken.authenticateToken, (request, response) => {
    services.userService.getUser(request.params.id).then(data => response.send(data)).catch(err => console.log(err));
});

app.post("/register", validation.registerValidator, (request, response) => {
    services.userService.register(request.body).then(res => response.send({ res })).catch(err => console.log(err))
});

app.post("/login", validation.loginValidator, (request, response) => {
    console.log("geldi");
    services.userService.login(request.body).then(res => response.send({ res })).catch(err => console.log(err))
});

module.exports = app;