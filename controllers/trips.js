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
tripRouter.put("/:id", (req, res) => {
    if (req.session.currentUser) {
        User.findOne({ "_id": req.session.currentUser._id}, (err, foundUser) => {
            //get the trip with the correct id
            let trip = foundUser.trips.find(trip => trip._id == req.params.id);
            let tripIndex = foundUser.trips.findIndex(trip => trip._id == req.params.id);
            console.log(foundUser.trips[tripIndex])
            console.log(foundUser.trips[tripIndex]._id)
            foundUser.trips[tripIndex] = req.body;
            foundUser.save(err => {
                console.log(foundUser.trips[tripIndex]._id)
                res.redirect(`/trips/${foundUser.trips[tripIndex]._id}`)
            });
            // res.render("./trips/edit.ejs", {
            //     currentUser: req.session.currentUser,
            //     trip,
            // });
        });
    } else {
        res.redirect("/");
    }
});

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
                res.redirect("/trips");
            });
            // res.send(foundUser.trips);
        });
    }
});

//E
tripRouter.get("/:id/edit", (req, res) => {
    if (req.session.currentUser) {
        User.findOne({ "_id": req.session.currentUser._id}, (err, foundUser) => {
            //get the trip with the correct id
            let trip = foundUser.trips.find(trip => trip._id == req.params.id);
            res.render("./trips/edit.ejs", {
                currentUser: req.session.currentUser,
                trip,
            });
        });
    } else {
        res.redirect("/");
    }
});

//S
tripRouter.get("/:id", (req, res) => {
    if (req.session.currentUser) {
        // User.findById(req.session.currentUser._id).populate("trips").exec(function(err, user) {
        //     if (err) return handleError(err);
        //     res.send(user.trips);
        // })
        User.findOne({ "_id": req.session.currentUser._id}, (err, foundUser) => {
            //get the trip with the correct id
            let trip = foundUser.trips.find(trip => trip._id == req.params.id);
            res.render("./trips/show.ejs", {
                currentUser: req.session.currentUser,
                trip,
            });
        });
        // User.findById(req.session.currentUser._id, (err, foundUser) => {
        //     res.send(foundUser.trips)
        // });
    } else {
        res.redirect("/");
    }
});


function createTrip (req, res) {
    User.findById(req.session.currentUser._id, (err, foundUser) => {
        foundUser.trips.push(req.body);
    })
}

module.exports = tripRouter;