const mongoose = require("mongoose");
const LeadSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  phone:      { type: String, required: true },
  source:     { type: String, default: "Website" },
  stage:      { type: String, default: "new" },
  assignedTo: { type: String, default: "" },
  notes:      { type: String, default: "" },
}, { timestamps: true });
module.exports = mongoose.model("Lead", LeadSchema);
