const express = require("express");
const router = express.Router();
const checkJWT = require("../../helpers/checkJWT");

router.post("/account/checkJWT", checkJWT, async (req, res) => {
  res.status(200).send();
});

module.exports = router;
