const express = require("express");
const router = express.Router();
const IndexProjects = require("../../models/quickProjectsIndex");
const config = require("../../config");

router.get("/getProjects", async (req, res) => {
  let query = req.query.q ? req.query.q : "";
  let limit = req.query.limit
    ? req.query.limit
    : config.projects.resultsPerPage;

  try {
    IndexProjects.paginate(
      { name: { $regex: new RegExp(query), $options: "i" } },
      {
        page: req.query.page,
        limit: limit,
        sort: { projectCreated: -1 },
      }
    ).then((result) => {
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
