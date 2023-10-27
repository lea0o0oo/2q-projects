require("dotenv").config();

module.exports = {
  database: {
    connectionString: process.env.MONGO_CONNECTION_STRING,
    databaseName: "mainDB",
  },
  cors: {
    origin: "*",
  },
  api: {
    port: 3001,
  },
  projects: {
    resultsPerPage: 12,
  },
};
