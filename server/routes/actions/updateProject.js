const express = require("express");
const router = express.Router();
const checkJWT = require("../../helpers/checkJWT");
const Project = require("../../models/project");

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
  currentProjectData.name = req.body.projectData.metadata.name;
  currentProjectData.data = req.body.projectData;
  currentProjectData.markModified("name");
  currentProjectData.markModified("data");
  await currentProjectData.save();
  res.status(200).send({
    success: true,
  });
});

module.exports = router;
