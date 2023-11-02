const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  data: {
    type: Object,
    default: () => new Object(),
  },
});

module.exports = mongoose.model("projects", projectSchema);
