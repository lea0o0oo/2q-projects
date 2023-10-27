const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

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

projectSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("projects", projectSchema);
