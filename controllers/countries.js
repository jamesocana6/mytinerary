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
        console.log(allCountries)
        console.log(allCountries[0].reviews)
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
        });
    })
});



module.exports = countryRouter;