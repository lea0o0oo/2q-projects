const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  projectCreated: {
    type: Number,
  },
  added: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

projectSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("projectsList", projectSchema);
