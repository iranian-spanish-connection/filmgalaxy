const router = require("express").Router();
const Film = require("../models/Film.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const fileUploader = require("../config/cloudinary.config");
const countryList = require("../utils/countryList");
const languageList = require("../utils/languageList");
const {
  genreList,
  projectTypeList,
  lengthCategoryList,
} = require("../utils/projecSpecsLists");

//PROJECTS PAGE

const filterList = (list, excluded) => {
  if (Array.isArray(excluded)) {
    return list.filter((elem) => !excluded.includes(elem));
  } else {
    return list.filter((elem) => elem !== excluded);
  }
};

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
  res.render("projects/create", {
    countryList,
    languageList,
    genreList,
    projectTypeList,
    lengthCategoryList,
  });
});

//ADD A PROJECT
const fields = [
  { name: "poster", maxCount: 1 },
  { name: "photos", maxCount: 8 },
];
router.post(
  "/profile/projects/create",
  fileUploader.fields(fields),
  (req, res) => {
    let posterPath, photosPaths;
    if (req.files.poster) posterPath = req.files.poster[0].path;
    if (req.files.photos) photosPaths = req.files.photos.map((e) => e.path);

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
      res.render("projects/editproject", {
        filmDetails,
        countryList: filterList(countryList, filmDetails.country),
        languageList: filterList(languageList, filmDetails.language),
        genreList: filterList(genreList, filmDetails.genre),
        projectTypeList: filterList(projectTypeList, filmDetails.projectType),
        lengthCategoryList: filterList(
          lengthCategoryList,
          filmDetails.projectlength
        ),
      });
    })
    .catch((err) => {
      console.log("error getting project details from DB", err);
      next();
    });
});

router.post(
  "/profile/projects/:title/edit",
  fileUploader.fields(fields),
  (req, res, next) => {
    let posterPath, photosPaths;
    if (req.files.poster) {
      posterPath = req.files.poster[0].path;
    } else {
      posterPath = req.body.existingPoster;
    }
    if (req.files.photos) {
      photosPaths = req.files.photos.map((e) => e.path);
    } else {
      photosPaths = req.body.existingPhotos.split(",");
    }

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
      poster: posterPath,
      photos: photosPaths,
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
  }
);

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
