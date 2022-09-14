const express = require("express");
const bcrypt = require("bcrypt");
const sessionsRouter = express.Router();
const User = require("../models/user.js");

//ROUTES
//I

//N
//login page
sessionsRouter.get('/login', (req, res) => {
    res.render("./member/new.ejs", {
        currentUser: req.session.currentUser,
    });
});
sessionsRouter.get('/logout', (req, res) => {
    res.render("./member/logout.ejs", {
        currentUser: req.session.currentUser,
    });
});

//D
//logout
sessionsRouter.delete('/', (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/');
    });
});

//U
//login 
sessionsRouter.post("/", (req, res) => {
    //Check for an existing user 
    User.findOne({
        username: req.body.username
    }, (err, foundUser) => {
        //send error if no user registered
        if (!foundUser) {
            res.send("No user with that username is registered.");
        } else {
            //if the user is found, compare the given password with the hashed password
            const passwordMatches = bcrypt.compareSync(req.body.password, foundUser.password);
            if (passwordMatches) {
                //add the user to the session
                req.session.currentUser = foundUser;
                //redirect back to our home page
                res.redirect("/trips");
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