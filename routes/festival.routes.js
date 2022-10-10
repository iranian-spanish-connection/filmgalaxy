const Festival = require("../models/Festival.model");

const router = require("express").Router();


router.get("/festivals", (req, res, next) => {
  Festival.find()
  .then((festivalsInDB) => {
      res.render("festivals/list", {festivalsInDB})
  })
  .catch(err => {
      console.log("Error getting festivals from DB", err)
  })
})

//   router.get("/profile/myfestival", (req, res) => {
//     res.render("festivals/myfestival");
// });

    router.get("/profile/myfestival", (req, res, next) => {
    Festival.findOne({submitter: req.session.user._id })
    .then((festivalFromDB)=>{
          res.render("festivals/myfestival", {festivalFromDB});
    })
    .catch(err=>{
      console.log("Error getting my festival from db", err)
    })
  });


router.get("/profile/add-my-festival", (req, res, next) => {
  res.render("festivals/createfestival");
});

router.post("/profile/myfestival", (req, res, next) => {
  const myFestival = {
    title: req.body.title,
    submitter: req.session.user
  }
  Festival.create(myFestival)
  .then((myFestival)=>{
    res.render("festivals/myfestival", {myFestival});
  })
  .catch(err=>{
    console.log("Error creating my festival", err)
  })
});

   router.post("/profile/myfestival/remove", (req, res, next)=>{
    console.log("something")
   Festival.findOneAndDelete({submitter: req.session.user._id })
  .then((result)=>{
    console.log("something2")

    console.log(result)
    res.render("/profile/myfestival")
  })
  .catch(err=>{
    console.log("Error deleting my festival", err)
  })

})



module.exports = router;
