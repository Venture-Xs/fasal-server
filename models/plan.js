const mongoose = require("mongoose")

const planSchema = new mongoose.Schema({
  crop: {
    type: String,
    required: true,
  },
  plan: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Plan", planSchema);
