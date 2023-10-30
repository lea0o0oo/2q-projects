const express = require("express");
const router = express.Router();
const Users = require("../../models/user");
const config = require("../../config");
const bcrypt = require("bcrypt");

router.post("/account/register", async (req, res) => {
  if (req.body.username && req.body.password && req.body.adminKey) {
    if (req.body.adminKey == config.accounts.adminKey) {
      bcrypt.hash(
        req.body.password,
        config.accounts.saltRounds,
        async function (err, hash) {
          if (err) {
            res.status(500).json({
              success: false,
              error: "Errore interno del server",
            });
            console.error(err);
            return;
          }
          if (await Users.exists({ username: req.body.username })) {
            res.status(409).json({
              success: false,
              error: "Username già in uso",
            });
            return;
          }
          await Users.create({
            username: req.body.username,
            password: hash,
          });
          res.status(201).send();
        }
      );
    } else {
      res.status(403).json({
        success: false,
        error: "Chiave admin non valida",
      });
    }
  } else {
    res.status(422).json({
      success: false,
      error: "Parametri del corpo mancanti",
    });
  }
});

module.exports = router;
