const mongoose = require("mongoose");

const PublicationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A publication must have a title"],
      trim: true,
      minlength: [3, "Publication title must contain atleast 3 characters"],
      maxlength: [50, "Publication title must contain atmost 50 characters"],
    },
    description: {
      type: String,
      required: [true, "A publication must have a description"],
      trim: true,
      minlength: [
        3,
        "Publication description must contain atleast 3 characters",
      ],
      maxlength: [
        200,
        "Publication description must contain atmost 200 characters",
      ],
    },
    content: {
      type: String,
      required: [true, "A publication must have content"],
      trim: true,
      minlength: [1, "Publication content must contain atleast a character"],
    },
    keywords: {
      type: [String],
      default: [],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      required: [true, "A publication must have an author"],
    },
    archived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Publication = mongoose.model("Publication", PublicationSchema);

module.exports = Publication;
