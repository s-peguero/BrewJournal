const mongoose = require("mongoose");

const tastingHistorySchema = new mongoose.Schema({
  coffeeName: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  dateTried: {
    type: Date,
    required: true,
  },
  flavorNotes: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("TastingHistory", tastingHistorySchema);