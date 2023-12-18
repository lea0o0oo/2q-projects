require("dotenv").config();

module.exports = {
  database: {
    connectionString: process.env.MONGO_CONNECTION_STRING, // Stringa di connessione
    databaseName: "mainDB", // Nome del database principale
  },
  cors: {
    origin: "*", // Impostazioni di cors.
  },
  api: {
    port: 3001, // Porta del back-end
    maxPayload: 10, // In mb
  },
  projects: {
    resultsPerPage: 12, // Risultati per pagina
  },
  accounts: {
    saltRounds: 10, // Giri di sale
    adminKey: process.env.ADMIN_KEY, // Chiave admin per la registrazione
    secretJWT: process.env.JWT_SECRET,
  },
  rateLimit: {
    windowMs: 5 * 60 * 1000, // 5 minutes
    limit: 200, // Limit each IP to 200 requests per `window` (here, per 5 minutes).
    standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Use an external store for consistency across multiple server instances.
  },
};
