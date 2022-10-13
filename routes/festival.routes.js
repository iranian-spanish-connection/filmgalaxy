const router = require("express").Router();
const Festival = require("../models/Festival.model");
const fileUploader = require("../config/cloudinary.config");
const countryList = require("../utils/lists/countries");
const {
  projectTypeList,
  lengthCategoryList,
} = require("../utils/lists/project-specs");
const formatList = require("../utils/lists/festival-specs");
const filterList = require("../utils/lists/filter");

//BROWSE FESTIVALS PAGE

router.get("/festivals", (req, res, next) => {
  Festival.find()
    .then((festivalsInDB) => {
      res.render("festivals/list", { festivalsInDB });
    })
    .catch((err) => {
      console.log("Error getting festivals from DB", err);
      next();
    });
});

//SEARCH FESTIVALS

router.post("/festivals", (req, res, next) => {
  const textToFind = req.body.search ? req.body.search.trim() : "";
  // Festival.find({
  //   $or: [
  //     { title: { $regex: `.*${textToFind}.*`, $options: "i" } },
  //     { description: { $regex: `.*${textToFind}.*`, $options: "i" } },
  //   ],
  // })
  Festival.find({ title: { $regex: ".*" + textToFind + ".*", $options: "i" } })
    .then((festivalsInDB) => {
      res.render("festivals/list", { festivalsInDB });
    })
    .catch((err) => {
      console.log("Error getting festivals from DB", err);
      next();
    });
});

//FESTIVAL DETAILS

router.get("/festivals/:festivalId", (req, res, next) => {
  const festivalId = req.params.festivalId;
  Festival.findById(festivalId)
    .then((festivalFromDB) => {
      res.render("festivals/festival-details", festivalFromDB);
    })
    .catch((err) => {
      console.log("error getting festival details from DB", err);
      next();
    });
});

//MY FESTIVAL

router.get("/profile/myfestival", (req, res) => {
  Festival.findOne({ submitter: req.session.user._id })
    .then((festivalFromDB) => {
      res.render("festivals/myfestival", { festivalFromDB });
    })
    .catch((err) => {
      console.log("Error getting my festival from db", err);
      next();
    });
});

//ADD MY FESTIVAL

router.get("/profile/add-my-festival", (req, res, next) => {
  res.render("festivals/createfestival", {
    countryList,
    projectTypeList,
    lengthCategoryList,
    formatList,
  });
});

const fields = [
  { name: "poster", maxCount: 1 },
  { name: "photos", maxCount: 8 },
];
router.post(
  "/profile/myfestival/create",
  fileUploader.fields(fields),
  (req, res, next) => {
    let posterPath, photosPaths;
    if (req.files.poster) posterPath = req.files.poster[0].path;
    if (req.files.photos) photosPaths = req.files.photos.map((e) => e.path);

    const myFestival = {
      title: req.body.title,
      description: req.body.description,
      country: req.body.country,
      location: req.body.location,
      format: req.body.format,
      eventStartDate: req.body.eventStartDate,
      eventEndDate: req.body.eventEndDate,
      submissionDeadline: req.body.submissionDeadline,
      entryFee: req.body.entryFee,
      acceptedCategories: req.body.acceptedCategories,
      acceptedLength: req.body.acceptedLength,
      contactPerson: req.body.contactPerson,
      contactEmail: req.body.contactEmail,
      website: req.body.website,
      poster: posterPath,
      photos: photosPaths,
      submitter: req.session.user,
      submittedFilms: req.body.submittedFilms,
    };
    Festival.create(myFestival)
      .then(() => {
        res.redirect("/profile/myfestival");
      })
      .catch((err) => {
        console.log("Error creating my festival", err);
        next();
      });
  }
);

//EDIT MY FESTIVAL

router.get("/profile/myfestival/edit", (req, res, next) => {
  Festival.findOne({ submitter: req.session.user._id })
    .then((myFestival) => {
      res.render("festivals/editfestival", {
        myFestival,
        countryList: filterList(countryList, myFestival.country),
        projectTypeList: filterList(
          projectTypeList,
          myFestival.acceptedCategories
        ),
        lengthCategoryList: filterList(
          lengthCategoryList,
          myFestival.acceptedLength
        ),
        formatList: filterList(formatList, myFestival.format),
      });
    })
    .catch((err) => {
      console.log("Error editing my festival", err);
      next();
    });
});

router.post(
  "/profile/myfestival/edit",
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

    const updateMyFestival = {
      title: req.body.title,
      description: req.body.description,
      country: req.body.country,
      location: req.body.location,
      format: req.body.format,
      eventStartDate: req.body.eventStartDate,
      eventEndDate: req.body.eventEndDate,
      submissionDeadline: req.body.submissionDeadline,
      entryFee: req.body.entryFee,
      acceptedCategories: req.body.acceptedCategories,
      acceptedLength: req.body.acceptedLength,
      contactPerson: req.body.contactPerson,
      contactEmail: req.body.contactEmail,
      website: req.body.website,
      poster: posterPath,
      photos: photosPaths,
      submitter: req.session.user,
      submittedFilms: req.body.submittedFilms,
    };
    Festival.findOneAndUpdate(
      { submitter: req.session.user._id },
      updateMyFestival
    )
      .then((result) => {
        res.redirect("/profile/myfestival");
      })
      .catch((err) => {
        console.log("Error updating my festival", err);
        next();
      });
  }
);

//DELETE MY FESTIVAL

router.post("/profile/myfestival/remove", (req, res, next) => {
  console.log("something");
  Festival.findOneAndDelete({ submitter: req.session.user._id })
    .then((result) => {
      res.render("festivals/myfestival");
    })
    .catch((err) => {
      console.log("Error deleting my festival", err);
      next();
    });
});

//MANAGE MY FESTIVAL

router.get("/profile/myfestival/manage", (req, res, next) => {
  res.render("festivals/manage");
});

module.exports = router;
