const mongoose = require("mongoose");

const tripSchema = mongoose.Schema({
    name: String,
    country: String,
    date: String,
    lengthOfTrip: Number,
    numberOfPeople: Number,
    totalCost: Number,
    placesVisited: [String],
    review: {type: mongoose.Schema.Types.ObjectId, ref: "Review"},
});

const userSchema = mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    trips: [tripSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;