const mongoose = require("mongoose");
const BookingSchema = new mongoose.Schema({
  riderName:  { type: String, required: true },
  phone:      { type: String, default: "" },
  vehicleId:  { type: String, required: true },
  plan:       { type: String, default: "" },
  start:      { type: String, required: true },
  end:        { type: String, required: true },
  kmLimit:    { type: Number, default: 1500 },
  kmUsed:     { type: Number, default: 0 },
  status:     { type: String, default: "active" },
  amount:     { type: Number, default: 0 },
  deposit:    { type: Number, default: 0 },
  payStatus:  { type: String, default: "unpaid" },
}, { timestamps: true });
module.exports = mongoose.model("Booking", BookingSchema);
