const mongoose = require("mongoose")

const cropSchema = new mongoose.Schema({
  current_crop: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Crop", cropSchema);
