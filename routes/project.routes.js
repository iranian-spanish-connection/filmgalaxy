const router = require("express").Router();

router.get("/projects/create", (req, res) => {
  res.render("projects/create");
});

module.exports = router;
