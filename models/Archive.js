const mongoose = require("mongoose");

const ArchiveSchema = new mongoose.Schema(
  {
    publication: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Publication",
      required: [true, "You need a publication to archive it"],
    },
  },
  { timestamps: true }
);

const Archive = mongoose.model("Archive", ArchiveSchema);

module.exports = Archive