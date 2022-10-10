const router = require("express").Router();
const Film = require("../models/Film.model");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/profile/projects", isLoggedIn, (req, res) => {
  Film.find()
    .then((projectsInDB) => {
      res.render("projects/projects", { projectsInDB });
    })
    .catch((err) => {
      console.log("problems getting projects from DB");
    });
});

router.get("/profile/projects/create", isLoggedIn, (req, res) => {
  res.render("projects/create");
});

router.post("/profile/projects/create", isLoggedIn, (req, res) => {
  const newProject = {
    title: req.body.title,
    country: req.body.country,
    completionDate: req.body.completionDate,
    runtime: req.body.runtime,
    director: req.body.director,
    synopsis: req.body.synopsis,
    projectlength: req.body.projectlength,
    projectType: req.body.projectType,
    language: req.body.language,
    genre: req.body.genre,
  };
  Film.create(newProject)
    .then(() => {
      console.log("Project was added successfully");
      res.redirect("/profile/projects");
    })
    .catch((err) => {
      console.log("There is an error adding project to DB", err);
    });
});

module.exports = router;
