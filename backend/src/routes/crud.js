// Generic CRUD route builder
const auth = require("../middleware/auth");

module.exports = function crudRoutes(Model, idField = null) {
  const router = require("express").Router();

  // GET all
  router.get("/", auth, async (req, res) => {
    try { res.json(await Model.find().sort({ createdAt: -1 })); }
    catch (e) { res.status(500).json({ error: e.message }); }
  });

  // GET one
  router.get("/:id", auth, async (req, res) => {
    try {
      const doc = idField
        ? await Model.findOne({ [idField]: req.params.id })
        : await Model.findById(req.params.id);
      if (!doc) return res.status(404).json({ error: "Not found" });
      res.json(doc);
    } catch (e) { res.status(500).json({ error: e.message }); }
  });

  // POST create
  router.post("/", auth, async (req, res) => {
    try { res.status(201).json(await Model.create(req.body)); }
    catch (e) { res.status(400).json({ error: e.message }); }
  });

  // PUT update
  router.put("/:id", auth, async (req, res) => {
    try {
      const doc = idField
        ? await Model.findOneAndUpdate({ [idField]: req.params.id }, req.body, { new: true })
        : await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!doc) return res.status(404).json({ error: "Not found" });
      res.json(doc);
    } catch (e) { res.status(400).json({ error: e.message }); }
  });

  // DELETE
  router.delete("/:id", auth, async (req, res) => {
    try {
      const doc = idField
        ? await Model.findOneAndDelete({ [idField]: req.params.id })
        : await Model.findByIdAndDelete(req.params.id);
      if (!doc) return res.status(404).json({ error: "Not found" });
      res.json({ deleted: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
  });

  return router;
};
