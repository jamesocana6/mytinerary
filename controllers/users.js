const express = require("express");
const Review = require("../models/review.js");
const userRouter = express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");

//ROUTES
//I
userRouter.get("/", (req, res) => {
    //Find user by id in the database and show username and trips using express-session
    //TEST FOR NOW
    User.find({}, (err, foundUsers) => {
        res.render("./user/index.ejs", {
            users: foundUsers,
        });
    });
});

//N
userRouter.get("/new", (req, res) => {
    res.render("./user/new.ejs");
});

//D

//U

//C
userRouter.post("/", (req, res) => {
    //Check for an existing username or email 
    User.findOne({
        $or: [{email: req.body.email}, {username: req.body.username}]
    }, (err, foundUser) => {
        if (!foundUser) {
            //overwrite the user password with hashed password, then pass that in to our database
            req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
            User.create(req.body, (err, createdUser) => {
                res.redirect("/user");
            });
        } else if (foundUser.email === req.body.email) {
            res.send("That email address has already been registered.");
        } else if (foundUser.username === req.body.username) {
            res.send("That username address has already been registered.");
        };
    });
});

//E

//S




module.exports = userRouter;