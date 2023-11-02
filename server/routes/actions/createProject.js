const express = require("express");
const router = express.Router();
const checkJWT = require("../../helpers/checkJWT");
const Project = require("../../models/project");
const QuickIndexProjects = require("../../models/quickProjectsIndex");

router.post("/createProject", checkJWT, async (req, res) => {
  if (!req.body.projectData) {
    res.status(422).json({
      success: false,
      error: "Parametro 'projectData' mancante",
    });
    return;
  }
  if (await Project.exists({ name: req.body.projectData.metadata.name })) {
    res.status(409).json({
      success: false,
      error: "A project with the same name already exists",
    });
    return;
  }
  const newProject = await Project.create({
    name: req.body.projectData.metadata.name,
    data: req.body.projectData,
  });
  await QuickIndexProjects.create({
    name: req.body.projectData.metadata.name,
    projectCreated: req.body.projectData.metadata.createdAt * 1000,
    _id: newProject.id,
  });
  res.status(201).send();
});

module.exports = router;
