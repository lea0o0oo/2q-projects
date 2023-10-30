const express = require("express");
const router = express.Router();

router.use("/", require("./getProjects/getProjects"));
router.use("/", require("./getProjects/getProjectData"));
router.use("/", require("./account/register"));
router.use("/", require("./account/login"));
router.use("/", require("./account/checkJWT"));
router.use("/", require("./actions/createProject"));
router.use("/", require("./actions/updateProject"));

module.exports = router;
