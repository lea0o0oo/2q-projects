const express = require("express");
const router = express.Router();
const Projects = require("../../models/project");
const config = require("../../config");

router.get("/getProjects", async (req, res) => {
  try {
    Projects.paginate("", {
      page: req.query.page,
      limit: config.projects.resultsPerPage,
    }).then((result) => {
      res.status(200).json({
        success: true,
        result: result,
      });
    });
    // const result = await Projects.find({})
    //   .limit(config.projects.resultsPerPage)
    //   .sort("createdAt")
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

module.exports = router;
