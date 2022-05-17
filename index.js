const express = require("express");
const app = express();
const helmet = require("helmet");
// const dotenv = require("dotenv");
const cors = require("cors");
const rateLimit = require('express-rate-limit')
// dotenv.config();
const connectDB = require("./config/db");
const facultyRoutes = require("./routes/faculty");
const userRoutes = require("./routes/user");
const publicationRoutes = require("./routes/publication");
const commentRoutes = require("./routes/comment");
const archiveRoutes = require("./routes/archive");
const announcementRoutes = require("./routes/announcement");

// Connecting to MongoDB
connectDB();

const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Middleware
app.use(helmet());
app.use(cors());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/faculty", facultyRoutes);
app.use("/user", userRoutes);
app.use("/admin", userRoutes);
app.use("/publication", publicationRoutes);
app.use("/comment", commentRoutes);
app.use("/archive", archiveRoutes);
app.use("/announcement", announcementRoutes);

app.get("/", (req, res) => {
  res.send("Faculty Publication Repository");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

module.exports = app;
