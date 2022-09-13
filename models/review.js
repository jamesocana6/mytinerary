const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    date: String,
    country: String,
    rating: {
        worth: Number,
        food: Number,
        sights: Number,
        overall: Number,
    },
    comment: String,
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;