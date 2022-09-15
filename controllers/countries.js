const express = require("express");
const countryRouter = express.Router();
const User = require("../models/user.js");
const Country = require("../models/country.js");
//const bcrypt = require("bcrypt");
//const countryNames = require("../models/countrySeed.js");

//ROUTES
//I
countryRouter.get("/home", (req, res) => {
    Country.find({}).populate("reviews").exec(function (err, allCountries) {
        //Sort countries in alphabetical order
        allCountries = allCountries.sort((a, b) => {
            let aFixed = a.name.toUpperCase();
            let bFixed = b.name.toUpperCase();
            if (aFixed < bFixed) {
                return -1;
            }
            if (aFixed > bFixed) {
                return 1;
            }
            return 0;
        });
        res.render("./country/index.ejs", {
            countries: allCountries,
            currentUser: req.session.currentUser,
            countryAvgRating,
            ratHigh,
            ratLow,
        });
    });
});

//N

//D

//U

//C

//E

//S
countryRouter.get("/countries/:id", (req, res) => {
    Country.findById(req.params.id).populate("reviews").exec(function (err, country) {
        //Find users with trips with country name === country page
        User.find({country: country.name}, (err, users) => {
            let numVisits = numberOfVisits(users, country);
            res.render("./country/show.ejs", {
                currentUser: req.session.currentUser,
                country,
                reviews: country.reviews,
                countryAvgRating,
                users,
                numVisits,
                ratHigh: ratHigh(countryAvgRating(country)),
                ratLow: ratLow(countryAvgRating(country)),
            });
        })
    })
});




//FUNCTIONS
function numberOfVisits(users, country) {
    if (users.length > 0) {
        let numOfVisits = 0; 
        for (let user of users) {
            for (const trip of user.trips) {
                if (trip.country === country.name) {
                    numOfVisits += 1;
                }
            }
        }
        return numOfVisits;
    } else {
        return 0;
    }
}

function countryAvgRating(country) {
    if (country.reviews.length > 0) {
        let avgFoodArr = [];
        let avgSightsArr = [];
        let avgWorthArr = [];
        let avgOverallArr = [];
        for (let review of country.reviews) {
            for (let i = 0; i < 4 ; i++ ) {
                switch (i) {
                    case 0:
                        avgFoodArr.push(review.rating.food);
                        break;
                    case 1:
                        avgSightsArr.push(review.rating.sights);
                        break;
                    case 2:
                        avgWorthArr.push(review.rating.worth);
                        break;
                    case 3:
                        avgOverallArr.push(review.rating.overall);
                        break;
                }
            }
        }
        let avgFood = Number.parseFloat((avgFoodArr.reduce((a,b) => a+b ) / avgFoodArr.length).toFixed(2));
        let avgSights = Number.parseFloat((avgSightsArr.reduce((a,b) => a+b ) / avgFoodArr.length).toFixed(2));
        let avgWorth = Number.parseFloat((avgWorthArr.reduce((a,b) => a+b ) / avgFoodArr.length).toFixed(2));
        let avgOverall = Number.parseFloat((avgOverallArr.reduce((a,b) => a+b ) / avgFoodArr.length).toFixed(2));
        return [avgFood, avgSights, avgWorth, avgOverall];
    } else {
        return [0, 0, 0, 0]
    }
}

function ratHigh(rating) {
    if (rating.length > 0) {
        let ratingHigh = [];
        for (let i  = 0; i < rating.length; i++) {
            ratingHigh.push(Math.ceil(rating[i]));
        }
        return ratingHigh;
    } else {
        return [0, 0, 0, 0];
    }
}

function ratLow(rating) {
    if (rating.length > 0) {
        let ratingLow = [];
        for (let i  = 0; i < rating.length; i++) {
            ratingLow.push(Math.floor(rating[i]));
        }
        return ratingLow;
    } else {
        return [0, 0, 0, 0];
    }
}

module.exports = countryRouter;