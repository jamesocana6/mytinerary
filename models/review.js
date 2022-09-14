const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    username: String,
    date: String,
    country: String,
    rating: {
        worth: Number,
        food: Number,
        sights: Number,
        overall: Number,
    },
    comment: String,
    anonymous: Boolean,
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;