const router = require("express").Router();
const Film = require("../models/Film.model");
const formatList = require("../utils/lists/festival-specs");
const filterList = require("../utils/lists/filter");



/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});



//Temporary Film Page

router.get("/films", (req, res, next) => {
  Film.find()
  .then((filmsFromDB)=>{

    res.render("projects/temp-list", {filmsFromDB})
  })
  .catch(err=>{
    console.log("Error getting films from DB", err)
  })
})


//Search For Film

router.post("/films", (req, res, next) => {
  const textToFind = req.body.search ? req.body.search.trim() : "";

  Film.find({ title: { $regex: ".*" + textToFind + ".*", $options: "i" } })
    .then((filmsFromDB) => {
      res.render("projects/temp-list", { filmsFromDB });
    })
    .catch((err) => {
      console.log("Error getting films from DB", err);
    });
});


router.get("/films/:title", (req, res, next) => {
  const title = req.params.title;
  Film.findOne({title: title})
    .then((filmsFromDB) => {
      res.render("projects/guest-view", filmsFromDB);
    })
    .catch((err) => {
      console.log("error getting film details from DB", err);
      next();
    });
});




module.exports = router;
