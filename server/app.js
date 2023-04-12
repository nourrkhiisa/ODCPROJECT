const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
const coachRoutes = require("./routes/coachRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRoutes);
app.use("/students", studentRoutes);
app.use("/coaches", coachRoutes);
app.use("/admin", adminRoutes);

// Connect to the database
db.authenticate()

  .then(() => {
    console.log("Database connected");
    db.sync();
  })
  .catch((err) => console.error(`Error connecting to the database: ${err}`));

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
