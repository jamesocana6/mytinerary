const express = require("express");
const userRouter = express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");

//ROUTES
//I

//N
userRouter.get("/new", (req, res) => {
    res.render("./user/new.ejs", {
        currentUser: req.session.currentUser,
    });
});

//D

//U

//C
userRouter.post("/", (req, res) => {
    //Check for an existing username or email 
    User.findOne({
        username: req.body.username
    }, (err, foundUser) => {
        if (!foundUser) {
            //overwrite the user password with hashed password, then pass that in to our database
            req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
            User.create(req.body, (err, createdUser) => {
                req.session.currentUser = createdUser;
                res.redirect("/trips");
            });
        } else if (foundUser.username === req.body.username) {
            res.send("That username address has already been registered.");
        };
    });
});

//E

//S




module.exports = userRouter;