const crud = require("./crud");
const models = require("../models/models");
const Vehicle = require("../models/Vehicle");
const Lead = require("../models/Lead");
const Booking = require("../models/Booking");

const modelMap = {
  vehicles: Vehicle,
  leads: Lead,
  bookings: Booking,
  plans: models.Plan,
  pdis: models.PDI,
  renewals: models.Renewal,
  returns: models.Return,
  followups: models.FollowUp,
  insurance: models.Insurance,
  recovery: models.Recovery,
  tasks: models.Task,
  timeline: models.Timeline,
};

module.exports = crud(modelMap["pdis"]);
