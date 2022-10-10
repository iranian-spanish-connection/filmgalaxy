const router = require("express").Router();

router.get("/profile/projects", (req, res) => {
  res.render("projects/projects");
});

router.get("/profile/create", (req, res) => {
  res.render("projects/create");
});

module.exports = router;
