const Festival = require("../models/Festival.model");

const router = require("express").Router();



router.get("/festivals", (req, res, next) => {
    Festival.find()
    .then((festivalsInDB) => {
        res.render("festivals", {festivalsInDB})
    })
    .catch(err => {
        console.log("Error getting festivals from DB", err)
    })
  })



  module.exports = router;
