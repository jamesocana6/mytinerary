const express = require("express");
const app = express();
require("dotenv").config();
const methodOverride = require("method-override");
const PORT = process.env.PORT;
const mongoose = require("mongoose");
const session = require("express-session");
const sessionController = require("./controllers/sessions.js")
const userController = require("./controllers/users.js");
const tripController = require("./controllers/trips.js");
const countryController = require("./controllers/countries.js");
const reviewController = require("./controllers/reviews.js");

//Connect MongoDB
mongoose.connect(process.env.DATABASE_URL);

//MIDDLEWARE 
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use("/user", userController);
app.use("/member", sessionController);
app.use(`/trips`, tripController);
app.use(countryController);
app.use(`/reviews`, reviewController);


//ROUTE
app.get("/", (req, res) => {
    res.redirect("/home");
});

app.get("/aboutme", (req, res) => {
    res.render("aboutMe.ejs");
})

//database connection error / success
const db = mongoose.connection;
db.on("error", (err) => console.log(err.message + "we got an error connecting the DB"));
db.on("connected", () => console.log("mongo connected"));
db.on("disconnected", () => console.log("mongo disconnected"));

app.listen(PORT, (req, res) => {
    console.log("hello there!");
});