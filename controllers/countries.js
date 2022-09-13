const express = require("express");
//const Review = require("../models/review.js");
const countryRouter = express.Router();
//const User = require("../models/user.js");
const Country = require("../models/country.js");
//const bcrypt = require("bcrypt");
//const countryNames = require("../models/countrySeed.js");

//ROUTES
//I
countryRouter.get("/", (req, res) => {
    Country.find({}, (err, allCountries) => {
        //Sort countries in alphabetical order
        allCountries = allCountries.sort((a,b) => a.name.charCodeAt(0) - b.name.charCodeAt(0));
        res.render("./country/index.ejs", {
            countries: allCountries,
            currentUser: req.session.currentUser,
        });
    });
});

//N

//D

//U

//C

//E

//S
countryRouter.get("/:id", (req, res) => {
    Country.findById(req.params.id, (err, foundCountry) => {
        res.render("./country/show.ejs", {
            country: foundCountry,
            currentUser: req.session.currentUser,
        });
    });
});


module.exports = countryRouter;