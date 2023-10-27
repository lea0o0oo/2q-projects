const express = require("express");
const router = express.Router();
const Projects = require("../../models/project");
const config = require("../../config");

router.get("/getProjects", (req, res) => {
  Projects.paginate({
    page: Number(req.query.page),
    limit: config.projects.resultsPerPage,
  })
    .then((result) => {
      res.status(200).json({
        success: true,
        result: result,
      });
    })
    .catch((e) => {
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    });
});

module.exports = router;
