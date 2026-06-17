const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  duration: { type: Number, required: true },
  kmLimit:  { type: Number, required: true },
  price:    { type: Number, required: true },
  deposit:  { type: Number, default: 0 },
  features: [String],
}, { timestamps: true });

const PDISchema = new mongoose.Schema({
  vehicleId:     { type: String, required: true },
  status:        { type: String, default: "pending" },
  completedBy:   { type: String, default: "" },
  completedDate: { type: String, default: "" },
  checks:        { type: Object, default: {} },
  notes:         { type: String, default: "" },
}, { timestamps: true });

const ServiceJobSchema = new mongoose.Schema({
  vehicleId:  { type: String, required: true },
  type:       { type: String, required: true },
  priority:   { type: String, default: "medium" },
  status:     { type: String, default: "scheduled" },
  assignedTo: { type: String, default: "" },
  notes:      { type: String, default: "" },
}, { timestamps: true });

const RenewalSchema = new mongoose.Schema({
  bookingId:    { type: String, required: true },
  customerName: { type: String, required: true },
  vehicle:      { type: String, required: true },
  dueDate:      { type: String, required: true },
  amount:       { type: Number, required: true },
  status:       { type: String, default: "upcoming" },
  ownedBy:      { type: String, default: "" },
}, { timestamps: true });

const ReturnSchema = new mongoose.Schema({
  bookingId:     { type: String, required: true },
  vehicleId:     { type: String, required: true },
  customerName:  { type: String, required: true },
  returnDate:    { type: String, default: "" },
  odo:           { type: Number, default: 0 },
  photos:        { type: Boolean, default: false },
  pdiDone:       { type: Boolean, default: false },
  refundStatus:  { type: String, default: "none" },
  accountStatus: { type: String, default: "open" },
  assignedTo:    { type: String, default: "" },
  nextStep:      { type: String, default: "" },
}, { timestamps: true });

const FollowUpSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  phone:        { type: String, default: "" },
  vehicleId:    { type: String, default: "" },
  bookingId:    { type: String, default: "" },
  reason:       { type: String, required: true },
  dueDate:      { type: String, required: true },
  status:       { type: String, default: "pending" },
  assignedTo:   { type: String, default: "" },
  notes:        { type: String, default: "" },
}, { timestamps: true });

const InsuranceSchema = new mongoose.Schema({
  vehicleId:  { type: String, required: true },
  policyNum:  { type: String, required: true },
  type:       { type: String, default: "policy" },
  premium:    { type: Number, default: 0 },
  renewal:    { type: String, default: "" },
  status:     { type: String, default: "active" },
  managedBy:  { type: String, default: "" },
  claimNotes: { type: String, default: "" },
}, { timestamps: true });

const RecoverySchema = new mongoose.Schema({
  bookingId:     { type: String, default: "" },
  customerName:  { type: String, required: true },
  phone:         { type: String, default: "" },
  vehicleId:     { type: String, default: "" },
  overdueAmount: { type: Number, default: 0 },
  daysPastDue:   { type: Number, default: 0 },
  status:        { type: String, default: "pending-call" },
  assignedTo:    { type: String, default: "" },
  notes:         { type: String, default: "" },
}, { timestamps: true });

const TaskSchema = new mongoose.Schema({
  title:      { type: String, required: true },
  status:     { type: String, default: "assigned" },
  dueDate:    { type: String, default: "" },
  assignedTo: { type: String, default: "" },
  category:   { type: String, default: "general" },
}, { timestamps: true });

const TimelineSchema = new mongoose.Schema({
  event: { type: String, required: true },
  by:    { type: String, default: "" },
  note:  { type: String, default: "" },
}, { timestamps: true });

module.exports = {
  Plan:       mongoose.model("Plan", PlanSchema),
  PDI:        mongoose.model("PDI", PDISchema),
  ServiceJob: mongoose.model("ServiceJob", ServiceJobSchema),
  Renewal:    mongoose.model("Renewal", RenewalSchema),
  Return:     mongoose.model("Return", ReturnSchema),
  FollowUp:   mongoose.model("FollowUp", FollowUpSchema),
  Insurance:  mongoose.model("Insurance", InsuranceSchema),
  Recovery:   mongoose.model("Recovery", RecoverySchema),
  Task:       mongoose.model("Task", TaskSchema),
  Timeline:   mongoose.model("Timeline", TimelineSchema),
};
