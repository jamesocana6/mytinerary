const mongoose = require("mongoose");

const countrySchema = mongoose.Schema({
    name: String,
    numberOfVisits: Number,
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    cities: [String],
});

const Country = mongoose.model("Country", countrySchema);

module.exports = Country;