const express = require("express");
const userRoute = express.Router();

userRoute.get("/", (req, res) => {
    res.send("route connected");
});

module.exports = userRoute;