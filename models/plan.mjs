import mongoose from "mongoose"

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

export const Plan = mongoose.model("Plan", planSchema);
