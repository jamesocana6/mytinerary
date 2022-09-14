const express = require("express");
const Review = require("../models/review.js");
const reviewRouter = express.Router();
const User = require("../models/user.js");
const Country = require("../models/country.js");
const countryNames = require("../models/countrySeed.js");

//ROUTES
//I

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
    //Check for an existing username or email 
    //res.send(req.session.currentUser);
    if (req.session.currentUser) {
        User.findById(req.session.currentUser._id, (err, foundUser) => {
            //add review id to trip 
            //get the trip with the correct id
            let trip = foundUser.trips.find(trip => trip._id == req.params.id);
            Review.findByIdAndDelete(trip.review, req.body, (err, foundReview) => {
                trip.review = undefined;
                Country.findOne({ "name": trip.country }, (err, foundCountry) => {
                    //Need to make a deep clone to be able to use the findIndex function.
                    let testarray = [];
                    //Turn array of objects to strings
                    for (const objId of foundCountry.reviews) {
                        testarray.push(objId.toString());
                    }
                    //splice index of string from the array of object ids
                    let indexReview = testarray.indexOf(foundReview._id.toString())
                    foundCountry.reviews.splice(indexReview, 1);
                    foundCountry.save();
                })
                foundUser.save(err => {
                    res.redirect(`/trips/${trip._id}`);
                });
            });
        });
    } else {
        res.redirect("/");
    }
});

//U
reviewRouter.put("/:id", (req, res) => {
    //Check for an existing username or email 
    //res.send(req.session.currentUser);
    if (req.session.currentUser) {
        if (req.body.anonymous === "on") {
            req.body.anonymous = true;
        } else {
            req.body.anonymous = false;
        }
        User.findById(req.session.currentUser._id, (err, foundUser) => {
            //add review id to trip 
            //get the trip with the correct id
            let trip = foundUser.trips.find(trip => trip._id == req.params.id);
            Review.findByIdAndUpdate(trip.review, req.body, (err, foundReview) => {
                trip.review = foundReview._id;
                //add review id to country 
                Country.findOne({ "name": trip.country}, (err, foundCountry) => {
                    foundCountry.reviews.push(foundReview._id);
                    foundCountry.save();
                })
                foundUser.save(err => {
                    res.redirect(`/trips/${trip._id}`);
                });
            });
        });
    } else {
        res.redirect("/");
    }
});

//C
reviewRouter.post("/:id", (req, res) => {
    //Check for an existing username or email 
    //res.send(req.session.currentUser);
    if (req.session.currentUser) {
        if (req.body.anonymous === "on") {
            req.body.anonymous = true;
        } else {
            req.body.anonymous = false;
        }
        Review.create(req.body, (err, createdReview) => {
            User.findById(req.session.currentUser._id, (err, foundUser) => {
                //add review id to trip 
                //get the trip with the correct id
                createdReview.username = foundUser.username;
                createdReview.save();
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
    } else {
        res.send("no users login")
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


module.exports = reviewRouter;