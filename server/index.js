const config = require("./config");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const compression = require("compression");

app.use(compression());
app.use(require("./routes"));
app.use(
  cors({
    origin: config.cors.origin,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("ciao mondo");
});

const connectionOptions = {
  dbName: config.database.databaseName,
  useUnifiedTopology: true,
};

async function connectToDb() {
  try {
    console.log("Connessione al database...");
    // Connect the client to the server	(optional starting in v4.7)
    await mongoose.connect(config.database.connectionString, connectionOptions);
    console.log("Connesso al database");
    try {
      app.listen(config.api.port, () => {
        console.log(
          `Server avviato sulla porta ${
            config.api.port
          } (http://localhost:${3001})`
        );
      });
    } catch (e) {
      console.log("Port already in use");
    }
  } catch (e) {
    console.log("⚠️ Errore durante la connessione al database");
    console.error(e);
    console.log("Riconnettendo in 5 secondi");
    await delay(5000);
    console.log("Riconnettendo...");
    connectToDb();
  }
}

connectToDb();