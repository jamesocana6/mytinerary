const express = require("express");
const Review = require("../models/review.js");
const tripRouter = express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");

//ROUTES
//I
tripRouter.get("/", (req, res) => {
    if (req.session.currentUser) {
        User.findById(req.session.currentUser._id, (err, foundUser) => {
            res.render("./dashboard.ejs", { 
                currentUser: foundUser
            });
        });
    } else {
        res.redirect("/");
    }
});

//N
tripRouter.get("/new", (req, res) => {
    if (req.session.currentUser) {
        res.render("./trips/new.ejs", {
            currentUser: req.session.currentUser,
        });
    } else {
        res.redirect("/");
    }
});

//D

//U

//C
tripRouter.post("/", (req, res) => {
    //Check for an existing username or email 
    //res.send(req.session.currentUser);
    if (!req.session.currentUser) {
        res.send("no users login")
    } else {
        User.findById(req.session.currentUser._id, (err, foundUser) => {
            foundUser.trips.push(req.body);
            foundUser.save(err => {
                console.log(req.session.currentUser.trips)
                console.log(foundUser.trips)
                res.redirect("/trips");
            });
            // res.send(foundUser.trips);
        });
    }
});

//E

//S


function createTrip (req, res) {
    User.findById(req.session.currentUser._id, (err, foundUser) => {
        foundUser.trips.push(req.body);
    })
}

module.exports = tripRouter;