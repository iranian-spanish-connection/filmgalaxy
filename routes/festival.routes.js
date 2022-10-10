const router = require("express").Router();
const Festival = require("../models/Festival.model");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/festivals", (req, res, next) => {
  Festival.find()
    .then((festivalsInDB) => {
      console.log(festivalsInDB);
      res.render("festivals/list", { festivalsInDB });
    })
    .catch((err) => {
      console.log("Error getting festivals from DB", err);
    });
});

router.get("/profile/myfestival", isLoggedIn, (req, res) => {
  Festival.findOne({ submitter: req.session.user._id })
    .then((festivalFromDB) => {
      res.render("festivals/myfestival", { festivalFromDB });
    })
    .catch((err) => {
      console.log("Error getting my festival from db", err);
    });
});

router.get("/profile/myfestival/create", isLoggedIn, (req, res) => {
  res.render("festivals/createfestival");
});

router.post("/profile/myfestival/create", isLoggedIn, (req, res) => {
  const myFestival = {
    title: req.body.title,
    submitter: req.session.user,
  };
  Festival.create(myFestival)
    .then(() => {
      res.redirect("/profile/myfestival");
    })
    .catch((err) => {
      console.log("Error creating my festival", err);
    });
});

router.post("/profile/myfestival/remove", isLoggedIn, (req, res, next) => {
  console.log("something");
  Festival.findOneAndDelete({ submitter: req.session.user._id })
    .then((result) => {
      console.log("something2");
      console.log(result);
      res.render("festivals/myfestival");
    })
    .catch((err) => {
      console.log("Error deleting my festival", err);
    });
});

module.exports = router;
