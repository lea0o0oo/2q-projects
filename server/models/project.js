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
    metadata: {
      name: String,
      description: String,
      createdAt: Number,
      icon: String,
    },
    content: {
      projectLink: String, // Eventuali link del progetto
      image: String, // Immagine codidificata in Base64
      iframe: String, // Link ad un iframe (se presente)
      code: {
        lang: String, // DEFAULT -> "cpp"
        code: String, // Codice (arduino)
      },
      prose: Boolean,
      customHTML: String, // HTML custom
      csv: String, // Tabella CSV formattata come stringa
    },
  },
});

module.exports = mongoose.model("projects", projectSchema);
