const router = require("express").Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

// GET all staff
router.get("/", auth, async (req, res) => {
  try { res.json(await User.find().select("-password").sort({ createdAt: -1 })); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

// POST create staff (admin only)
router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ error: "Admin only" });
    const user = await User.create(req.body);
    res.status(201).json({ ...user.toObject(), password: undefined });
  } catch (e) { res.status(400).json({ error: e.message }); }
});

// PUT update staff
router.put("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ error: "Admin only" });
    const { password, ...rest } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, rest, { new: true }).select("-password");
    res.json(user);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

// DELETE staff
router.delete("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ error: "Admin only" });
    await User.findByIdAndDelete(req.params.id);
    res.json({ deleted: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
