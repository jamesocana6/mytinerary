const express = require("express");
const userRoute = express.Router();
const User = require("../models/user.js");

//ROUTES
//I
userRoute.get("/", (req, res) => {
    //Find user by id in the database and show username and trips using express-session
    //TEST FOR NOW
    User.find({}, (err, foundUsers) => {
        res.render("./user/index.ejs", {
            users: foundUsers,
        });
    });
});

//N

//D

//U

//C
userRoute.post("/", (req, res) => {
    User.create(req.body, (err, createdUser) => {
        res.send(createdUser);
        // res.redirect("/mytrips");
    })
});

//E

//S




module.exports = userRoute;