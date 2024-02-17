import mongoose from "mongoose"

const cropSchema = new mongoose.Schema({
  current_crop: {
    type: String,
    required: true,
  },
});

export const Crop = mongoose.model("Crop", cropSchema);
