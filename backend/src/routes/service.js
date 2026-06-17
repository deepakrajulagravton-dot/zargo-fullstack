const router = require("express").Router();
const { ServiceJob } = require("../models/models");
const Vehicle = require("../models/Vehicle");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try { res.json(await ServiceJob.find().sort({ createdAt: -1 })); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

router.post("/", auth, async (req, res) => {
  try {
    const job = await ServiceJob.create(req.body);
    // Mark vehicle as in service
    if (req.body.vehicleId)
      await Vehicle.findOneAndUpdate({ id: req.body.vehicleId }, { status: "service" });
    res.status(201).json(job);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const job = await ServiceJob.findByIdAndUpdate(req.params.id, req.body, { new: true });
    // If completed, mark vehicle ready
    if (req.body.status === "completed" && job.vehicleId)
      await Vehicle.findOneAndUpdate({ id: job.vehicleId }, { status: "ready_for_booking" });
    res.json(job);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

router.delete("/:id", auth, async (req, res) => {
  try { await ServiceJob.findByIdAndDelete(req.params.id); res.json({ deleted: true }); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
