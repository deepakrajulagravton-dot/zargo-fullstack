require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

// Routes
app.use("/api/auth",      require("./routes/auth"));
app.use("/api/vehicles",  require("./routes/vehicles"));
app.use("/api/leads",     require("./routes/leads"));
app.use("/api/bookings",  require("./routes/bookings"));
app.use("/api/plans",     require("./routes/plans"));
app.use("/api/pdis",      require("./routes/pdis"));
app.use("/api/service",   require("./routes/service"));
app.use("/api/renewals",  require("./routes/renewals"));
app.use("/api/returns",   require("./routes/returns"));
app.use("/api/followups", require("./routes/followups"));
app.use("/api/insurance", require("./routes/insurance"));
app.use("/api/recovery",  require("./routes/recovery"));
app.use("/api/tasks",     require("./routes/tasks"));
app.use("/api/staff",     require("./routes/staff"));
app.use("/api/timeline",  require("./routes/timeline"));

app.get("/", (req, res) => res.json({ status: "Zargo API running" }));

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => { console.error("DB connection error:", err); process.exit(1); });
