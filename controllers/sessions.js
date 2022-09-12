const express = require("express");
const bcrypt = require("bcrypt");
const sessionsRouter = express.Router();
const User = require("../models/user.js");

//ROUTES
//I

//N
sessionsRouter.get('/new', (req, res) => {
    res.render("./sessions/new.ejs", {
        currentUser: req.session.currentUser,
    });
});

//D
sessionsRouter.delete('/', (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/');
    });
});

//U
sessionsRouter.post("/", (req, res) => {
    //Check for an existing user 
    User.findOne({
        email: req.body.email,
    }, (err, foundUser) => {
        //send error if no user is found
        if (!foundUser) {
            res.send("No user with that email address has been registered.");
        } else {
            //if the user is found, compare the given password with the hashed password
            const passwordMatches = bcrypt.compareSync(req.body.password, foundUser.password);
            if (passwordMatches) {
                //add the user to the session
                req.session.currentUser = foundUser;
                //redirect back to our home page
                res.redirect("/");
            } else {
                //if the passwords don't match
                res.send("Invalid credentials.")
            };
        };
    });
});

//C

//E

//S


module.exports = sessionsRouter;