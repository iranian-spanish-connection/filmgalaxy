const router = require("express").Router();
const Film = require("../models/Film.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const fileUploader = require("../config/cloudinary.config");

//PROJECTS PAGE

router.get("/profile/projects", (req, res) => {
  Film.find({ submitter: req.session.user._id })
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

//ADD A PROJECT

router.post(
  "/profile/projects/create",
  fileUploader.array("file", 12),
  (req, res) => {
    const posterPath = req.files[0].path;
    const photosPaths = req.files.slice(1).map((file) => file.path);
    const newProject = {
      title: req.body.title,
      country: req.body.country,
      language: req.body.language,
      genre: req.body.genre,
      completionDate: req.body.completionDate,
      runtime: req.body.runtime,
      director: req.body.director,
      writer: req.body.writer,
      cast: req.body.cast,
      producer: req.body.producer,
      synopsis: req.body.synopsis,
      projectlength: req.body.projectlength,
      projectType: req.body.projectType,
      poster: posterPath,
      photos: photosPaths,
      trailer: req.body.trailer,
      preview: req.body.preview,
      submitter: req.session.user,
      submittedInFestivals: req.body.submittedInFestivals,
    };
    Film.create(newProject)
      .then(() => {
        console.log("Project was added successfully");
        res.redirect("/profile/projects");
      })
      .catch((err) => {
        console.log("There is an error adding project to DB", err);
      });
  }
);

//VIEW PROJECT

router.get("/profile/projects/:title", (req, res, next) => {
  Film.findOne({ title: req.params.title })
    .then((filmDetails) => {
      res.render("projects/viewproject", filmDetails);
    })
    .catch((err) => {
      console.log("error getting project details from DB", err);
      next();
    });
});

//EDIT PROJECT

router.get("/profile/projects/:title/edit", (req, res, next) => {
  Film.findOne({ title: req.params.title })
    .then((filmDetails) => {
      res.render("projects/editproject", filmDetails);
    })
    .catch((err) => {
      console.log("error getting project details from DB", err);
      next();
    });
});

router.post("/profile/projects/:title/edit", (req, res, next) => {
  const updatedProject = {
    title: req.body.title,
    country: req.body.country,
    language: req.body.language,
    genre: req.body.genre,
    completionDate: req.body.completionDate,
    runtime: req.body.runtime,
    director: req.body.director,
    writer: req.body.writer,
    cast: req.body.cast,
    producer: req.body.producer,
    synopsis: req.body.synopsis,
    projectlength: req.body.projectlength,
    projectType: req.body.projectType,
    poster: req.body.poster,
    still: req.body.still,
    trailer: req.body.trailer,
    preview: req.body.preview,
    submitter: req.session.user,
    submittedInFestivals: req.body.submittedInFestivals,
  };

  Film.findOneAndUpdate({ title: req.params.title }, updatedProject)
    .then(() => {
      res.redirect(`/profile/projects/${updatedProject.title}`);
    })
    .catch((err) => {
      console.log("Error updating project", err);
      next();
    });
});

//DELETE PROJECT

router.post("/profile/projects/:title/remove", (req, res, next) => {
  Film.findOneAndDelete({ title: req.params.title })
    .then(() => {
      res.redirect("/profile/projects");
    })
    .catch((err) => {
      console.log("Error deleting project", err);
      next();
    });
});

module.exports = router;
