const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema({
  body: {
    type: String,
    required: [true, "An announcement must have a body"],
  },
});

const Announcement = mongoose.model("Announcement", AnnouncementSchema);

module.exports = Announcement;
