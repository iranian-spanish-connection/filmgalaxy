const Festival = require("../models/Festival.model");

const router = require("express").Router();


router.get("/festivals", (req, res, next) => {
  Festival.find()
  .then((festivalsInDB) => {
    console.log(festivalsInDB)
      res.render("festivals/list", {festivalsInDB})
  })
  .catch(err => {
      console.log("Error getting festivals from DB", err)
  })
})



router.get("/festivals/create", (req, res) => {
  res.render("festivals/create");
});




module.exports = router;
