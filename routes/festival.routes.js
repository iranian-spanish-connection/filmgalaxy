const router = require("express").Router();
const Festival = require("../models/Festival.model");
const isLoggedIn = require("../middleware/isLoggedIn");



//BROWSE FESTIVALS PAGE

router.get("/festivals", (req, res, next) => {
  Festival.find()
    .then((festivalsInDB) => {
      res.render("festivals/list", { festivalsInDB });
    })
    .catch((err) => {
      console.log("Error getting festivals from DB", err);
    });
});



//MY FESTIVAL

//   router.get("/profile/myfestival", (req, res) => {
//     res.render("festivals/myfestival");
// });

router.get("/profile/myfestival", (req, res) => {
  Festival.findOne({ submitter: req.session.user._id })
    .then((festivalFromDB) => {
      res.render("festivals/myfestival", { festivalFromDB });
    })
    .catch((err) => {
      console.log("Error getting my festival from db", err);
    });
});



//ADD MY FESTIVAL

router.get("/profile/add-my-festival", (req, res, next) => {
  res.render("festivals/createfestival");
});



router.post("/profile/myfestival", (req, res, next) => {
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




//EDIT MY FESTIVAL

router.get("/profile/myfestival/edit", (req, res, next) => {
  Festival.findOne({ submitter: req.session.user._id }) 
  .then((myFestival) => {
      res.render("festivals/editfestival", {myFestival})
  })
  .catch(err => {
    console.log("Error editing my festival", err);
    next();
  });
});


router.post("/profile/myfestival/edit", (req, res, next) => {
  const updateMyFestival = {
      title: req.body.title,
      country: req.body.country,
  }
  Festival.findOneAndUpdate({ submitter: req.session.user._id }, updateMyFestival)
  .then((result) => {
   res.redirect("/profile/myfestival")
     
  })
  .catch(err => {
    console.log("Error updating my festival", err)
  })
})



//DELETE MY FESTIVAL

router.post("/profile/myfestival/remove", (req, res, next) => {
  console.log("something");
  Festival.findOneAndDelete({ submitter: req.session.user._id })
    .then((result) => {
      res.render("festivals/myfestival");
    })
    .catch((err) => {
      console.log("Error deleting my festival", err);
    });
});




//MANAGE MY FESTIVAL

router.get("/profile/myfestival/manage", (req, res, next)=>{
  res.render("festivals/manage")
})


module.exports = router;
