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
        });
    });
    // Country.find({}, (err, allCountries) => {
    //     //Sort countries in alphabetical order
    //     allCountries = allCountries.sort((a, b) => {
    //         let aFixed = a.name.toUpperCase();
    //         let bFixed = b.name.toUpperCase();
    //         if (aFixed < bFixed) {
    //             return -1;
    //         }
    //         if (aFixed > bFixed) {
    //             return 1;
    //         }
    //         return 0;
    //     });
    //     res.render("./country/index.ejs", {
    //         countries: allCountries,
    //         currentUser: req.session.currentUser,
    //     });
    // });
});

//N

//D

//U

//C

//E

//S
countryRouter.get("/countries/:id", (req, res) => {
    Country.findById(req.params.id).populate("reviews").exec(function (err, country) {
        res.render("./country/show.ejs", {
            currentUser: req.session.currentUser,
            country,
            reviews: country.reviews,
            countryAvgRating,
        });
    })
});

function countryAvgRating(country) {
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
    let avgFood = (avgFoodArr.reduce((a,b) => a+b ) / avgFoodArr.length).toFixed(2);
    let avgSights = (avgSightsArr.reduce((a,b) => a+b ) / avgFoodArr.length).toFixed(2);
    let avgWorth = (avgWorthArr.reduce((a,b) => a+b ) / avgFoodArr.length).toFixed(2);
    let avgOverall = (avgOverallArr.reduce((a,b) => a+b ) / avgFoodArr.length).toFixed(2);
    return [avgFood, avgSights, avgWorth, avgOverall];
}

module.exports = countryRouter;