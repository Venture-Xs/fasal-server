const mongoose = require("mongoose");

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

mongoose.model("Plan", planSchema);
