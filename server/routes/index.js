const express = require("express");
const router = express.Router();

router.use("/", require("./getProjects/getProjects"));

module.exports = router;
