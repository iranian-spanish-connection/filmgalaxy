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
  // Festival.find({
  //   $or: [
  //     { title: { $regex: `.*${textToFind}.*`, $options: "i" } },
  //     { description: { $regex: `.*${textToFind}.*`, $options: "i" } },
  //   ],
  // })
  Film.find({ title: { $regex: ".*" + textToFind + ".*", $options: "i" } })
    .then((filmsFromDB) => {
      res.render("projects/temp-list", { filmsFromDB });
    })
    .catch((err) => {
      console.log("Error getting films from DB", err);
    });
});


module.exports = router;
