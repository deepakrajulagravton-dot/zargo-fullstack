const mongoose = require("mongoose");
const VehicleSchema = new mongoose.Schema({
  id:     { type: String, required: true, unique: true },
  plate:  { type: String, required: true },
  model:  { type: String, required: true },
  hub:    { type: String, required: true },
  status: { type: String, default: "available" },
  odo:    { type: Number, default: 0 },
}, { timestamps: true });
module.exports = mongoose.model("Vehicle", VehicleSchema);
