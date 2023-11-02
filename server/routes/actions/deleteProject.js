const express = require("express");
const router = express.Router();
const checkJWT = require("../../helpers/checkJWT");
const Project = require("../../models/project");
const IndexingProject = require("../../models/quickProjectsIndex");

router.delete("/deleteProject", checkJWT, async (req, res) => {
  if (!req.body.projectId) {
    res.status(422).json({
      success: false,
      error: "Parametro 'projectId' mancante",
    });
    return;
  }
  if (!(await Project.exists({ _id: req.body.projectId }))) {
    res.status(404).json({
      success: false,
      error: "Il progetto non esiste",
    });
    return;
  }
  await Project.deleteOne({ _id: req.body.projectId });
  await IndexingProject.deleteOne({ _id: req.body.projectId });
  res.status(200).json({
    success: true,
  });
});

module.exports = router;
