const express = require("express");
const router = express.Router();
const Projects = require("../../models/project");
const config = require("../../config");

router.get("/project/:id", async (req, res) => {
  try {
    if (!(await Projects.exists({ _id: req.params.id }))) {
      res.status(404).json({
        success: false,
        error: "Progetto non trovato",
      });
      return;
    }
  } catch (e) {
    res.status(404).json({
      success: false,
      error: "Progetto non trovato",
    });
    return;
  }
  const projectData = await Projects.findById(req.params.id);
  res.status(200).json({
    success: true,
    result: projectData.data,
  });
});

module.exports = router;
