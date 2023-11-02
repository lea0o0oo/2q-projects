const express = require("express");
const router = express.Router();
const checkJWT = require("../../helpers/checkJWT");
const Project = require("../../models/project");
const IndexingProject = require("../../models/quickProjectsIndex");

router.post("/updateProject", checkJWT, async (req, res) => {
  if (!req.body.projectData || !req.body.projectId) {
    res.status(422).json({
      success: false,
      error: "Parametro 'projectData' o 'projectId' mancante",
    });
    return;
  }
  if (!(await Project.exists({ _id: req.body.projectId }))) {
    res.status(404).json({
      success: false,
      error: "Project doesen't exist",
    });
    return;
  }
  let currentProjectData = await Project.findById(req.body.projectId);
  let indexingData = await IndexingProject.findById(req.body.projectId);
  currentProjectData.name = req.body.projectData.metadata.name;
  currentProjectData.data = req.body.projectData;
  indexingData.name = req.body.projectData.metadata.name;
  indexingData.projectCreated = req.body.projectData.metadata.createdAt * 1000;
  indexingData.markModified("name");
  indexingData.markModified("projectCreated");
  currentProjectData.markModified("name");
  currentProjectData.markModified("data");
  await currentProjectData.save();
  await indexingData.save();
  res.status(200).send({
    success: true,
  });
});

module.exports = router;
