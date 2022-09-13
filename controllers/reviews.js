const express = require("express");
const Review = require("../models/review.js");
const reviewRouter = express.Router();
const User = require("../models/user.js");
const Country = require("../models/country.js");
const countryNames = require("../models/countrySeed.js");

//ROUTES
//I
reviewRouter.get("/", (req, res) => {

});

//N
reviewRouter.get("/:id/new", (req, res) => {
    if (req.session.currentUser) {
        User.findOne({ "_id": req.session.currentUser._id}, (err, foundUser) => {
            //get the trip with the correct id
            let trip = foundUser.trips.find(trip => trip._id == req.params.id);
            Country.findOne({ "name": trip.country }, (err, foundCountry) => {
                res.render("./review/new.ejs", {
                    currentUser: foundUser,
                    trip,
                    foundCountry,
                });
            });
        });
    } else {
        res.redirect("/");
    }
});

//D
reviewRouter.delete("/:id", (req, res) => {

});

//U
reviewRouter.put("/:id", (req, res) => {

});

//C
reviewRouter.post("/:id", (req, res) => {
    //Check for an existing username or email 
    //res.send(req.session.currentUser);
    if (!req.session.currentUser) {
        res.send("no users login")
    } else {
        if (req.body.anonymous === "on") {
            req.body.anonymous = true;
        } else {
            req.body.anonymous = false;
        }
        Review.create(req.body, (err, createdReview) => {
            User.findById(req.session.currentUser._id, (err, foundUser) => {
                //add review id to trip 
                //get the trip with the correct id
                let trip = foundUser.trips.find(trip => trip._id == req.params.id);
                trip.review = createdReview._id;
                //add review id to country 
                Country.findOne({ "name": trip.country}, (err, foundCountry) => {
                    foundCountry.reviews.push(createdReview._id);
                    foundCountry.save();
                })
                foundUser.save(err => {
                    res.redirect(`/trips/${trip._id}`);
                });
            });
        });
    }
});

//E
reviewRouter.get("/:id/edit", (req, res) => {
    if (req.session.currentUser) {
        User.findOne({ "_id": req.session.currentUser._id}, (err, foundUser) => {
            //get the trip with the correct id
            let trip = foundUser.trips.find(trip => trip._id == req.params.id);
            Review.findOne({ "_id": trip.review }, (err, foundReview) => {
                Country.findOne({ "name": trip.country }, (err, foundCountry) => {
                    res.render("./review/edit.ejs", {
                        currentUser: foundUser,
                        trip,
                        foundCountry,
                        foundReview,
                    });
                });
            });
        });
    } else {
        res.redirect("/");
    }
});

//S
reviewRouter.get("/:id", (req, res) => {

});


module.exports = reviewRouter;