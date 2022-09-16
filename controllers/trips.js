const express = require("express");
const Review = require("../models/review.js");
const tripRouter = express.Router();
const User = require("../models/user.js");
const Country = require("../models/country.js");
const countryNames = require("../models/countrySeed.js");

//ROUTES
//I
tripRouter.get("/", (req, res) => {
    if (req.session.currentUser) {
        User.findById(req.session.currentUser._id).populate("trips.review").exec(function (err, user) {
            res.render("./dashboard.ejs", {
                currentUser: user,
                tripsArr: user.trips,
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
            countryNames,
        });
    } else {
        res.redirect("/");
    }
});

//D
tripRouter.delete("/:id", (req, res) => {
    if (req.session.currentUser) {
        User.findOne({ "_id": req.session.currentUser._id }, (err, foundUser) => {
            //get the trip with the correct id
            let tripIndex = foundUser.trips.findIndex(trip => trip._id == req.params.id);
            let trip = foundUser.trips.find(trip => trip._id == req.params.id);
            deleteReview(trip);
            foundUser.trips.splice(tripIndex, 1);
            foundUser.save(err => {
                res.redirect("/trips");
            });
        });
    } else {
        res.redirect("/");
    }
});

//U
tripRouter.put("/:id", (req, res) => {
    if (req.session.currentUser) {
        User.findOne({ "_id": req.session.currentUser._id }, (err, foundUser) => {
            let trip = foundUser.trips.find(trip => trip._id == req.params.id);
            //get the trip with the correct id
            let tripIndex = foundUser.trips.findIndex(trip => trip._id == req.params.id);
            //if the country is not already a document saved in the DB create it
            Country.findOne({ "name": req.body.country }, (err, foundCountry) => {
                if (!foundCountry) {
                    Country.create({
                        name: req.body.country,
                    }, (err, createdCountry) => {
                    })
                }
            })
            deleteReview(trip);
            foundUser.trips[tripIndex] = req.body;
            foundUser.save(err => {
                res.redirect(`/trips/${foundUser.trips[tripIndex]._id}`)
            });
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
            //if the country is not already a document saved in the DB create it
            Country.findOne({ "name": req.body.country }, (err, foundCountry) => {
                if (!foundCountry) {
                    Country.create({
                        name: req.body.country,
                    }, (err, createdCountry) => {
                    })
                }
            })
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
        User.findOne({ "_id": req.session.currentUser._id }, (err, foundUser) => {
            //get the trip with the correct id
            let trip = foundUser.trips.find(trip => trip._id == req.params.id);
            res.render("./trips/edit.ejs", {
                currentUser: foundUser,
                trip,
                countryNames,
            });
        });
    } else {
        res.redirect("/");
    }
});

//S
tripRouter.get("/:id", (req, res) => {
    if (req.session.currentUser) {
        let today = getDate();
        User.findOne({ "_id": req.session.currentUser._id }, (err, foundUser) => {
            //get the trip with the correct id
            let trip = foundUser.trips.find(trip => trip._id == req.params.id);
            //find the review referenced by the trip
            Review.findOne({ "_id": trip.review }, (err, foundReview) => {
                Country.findOne({ "name": trip.country }, (err, foundCountry) => {
                    res.render("./trips/show.ejs", {
                        currentUser: foundUser,
                        trip,
                        foundCountry,
                        foundReview,
                        today,
                    });
                });
            });
        });
    } else {
        res.redirect("/");
    }
});


function deleteReview (trip) {
    if (trip.review) {
        Review.findByIdAndDelete(trip.review, (err, foundReview) => {
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
        });
    }
}

function getDate() {
    let year = new Date().getFullYear().toString();
    let month = new Date().getMonth()+1;
    if (month < 10) {
        month = "0"+month;
    }
    let day = new Date().getDate().toString();
    if (day < 10 ) {
        day = "0"+day;
    }
    let today = year+month+day;
    return today;
}

module.exports = tripRouter;