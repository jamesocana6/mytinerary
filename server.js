const express = require("express");
const app = express();
require("dotenv").config();
const methodOverride = require("method-override");
const PORT = process.env.PORT;
const mongoose = require("mongoose");
const userController = require("./controllers/users.js");

//Connect MongoDB
mongoose.connect(process.env.DATABASE_URL);

//MIDDLEWARE 
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use("/mytrips", userController);

//database connection error / success
const db = mongoose.connection;
db.on("error", (err) => console.log(err.message + "we got an error connecting the DB"));
db.on("connected", () => console.log("mongo connected"));
db.on("disconnected", () => console.log("mongo disconnected"));

app.listen(PORT, (req, res) => {
    console.log("hello there!");
});