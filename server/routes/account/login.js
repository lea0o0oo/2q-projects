const express = require("express");
const router = express.Router();
const Users = require("../../models/user");
const config = require("../../config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/account/login", async (req, res) => {
  if (req.body.username && req.body.password) {
    const userData = await Users.findOne({ username: req.body.username });

    try {
      bcrypt.compare(
        req.body.password,
        userData.password,
        function (err, result) {
          if (err) {
            console.error(err);
            res.status(500).json({
              success: false,
              error: "Errore interno del server",
            });
            return;
          }
          if (result == true) {
            jwt.sign(
              { username: req.body.username },
              config.accounts.secretJWT,
              { expiresIn: "2h" },
              function (err, token) {
                if (err) {
                  console.error(err);
                  res.status(500).json({
                    success: false,
                    error: "Errore interno del server",
                  });
                  return;
                }
                res.status(200).json({
                  success: true,
                  token: token,
                });
              }
            );
          } else {
            res.status(403).json({
              success: false,
              error: "Password invalida",
            });
          }
        }
      );
    } catch (e) {
      res.status(404).json({
        success: false,
        error: "Utente non trovato",
      });
    }
  } else {
    res.status(422).json({
      success: false,
      error: "Mancanti parametri del corpo",
    });
  }
});

module.exports = router;
