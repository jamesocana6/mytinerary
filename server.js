const express = require("express");
const app = express();
require("dotenv").config();
const methodOverride = require("method-override");
const PORT = process.env.PORT;
const mongoose = require("mongoose");
const session = require("express-session");
const sessionController = require("./controllers/sessions.js")
const userController = require("./controllers/users.js");

//Connect MongoDB
mongoose.connect(process.env.DATABASE_URL);

//MIDDLEWARE 
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use("/user", userController);
app.use("/member", sessionController);

//ROUTE
app.get("/", (req, res) => {
	if (req.session.currentUser) {
		res.render('dashboard.ejs', {
			currentUser: req.session.currentUser
		});
	} else {
		res.render('index.ejs', {
			currentUser: req.session.currentUser
		});
	}
});

//database connection error / success
const db = mongoose.connection;
db.on("error", (err) => console.log(err.message + "we got an error connecting the DB"));
db.on("connected", () => console.log("mongo connected"));
db.on("disconnected", () => console.log("mongo disconnected"));

app.listen(PORT, (req, res) => {
    console.log("hello there!");
});