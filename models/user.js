const mongoose = require("mongoose");

const tripSchema = mongoose.Schema({
    name: String,
    country: [{type: mongoose.Schema.Types.ObjectId, ref: "Country"}],
    date: Date,
    lengthOfTrip: Number,
    numberOfPeople: Number,
    totalCost: Number,
    placesVisited: [String],
    isComplete: Boolean,
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "Review"}],
});

const userSchema = mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, unique: true, required: true },
    trips: [tripSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;