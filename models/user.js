const mongoose = require("mongoose");

const tripSchema = mongoose.Schema({
    name: String,
    date: Date,
    lengthOfTrip: Number,
    numberOfPeople: Number,
    totalCost: Number,
    placesVisited: [String],
    country: [{type: mongoose.Schema.Types.ObjectId, ref: "Country"}],
    isComplete: Boolean,
});

const userSchema = mongoose.Schema({
    email: { type: String, unique: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, unique: true, required: true },
    trips: [tripSchema],
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "Review"}],
});

const User = mongoose.model("User", userSchema);

module.exports = User;