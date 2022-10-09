const router = require("express").Router();

router.get("/festivals", (req, res) => {
  res.render("festivals/list");
});

router.get("/festivals/create", (req, res) => {
  res.render("festivals/create");
});

module.exports = router;
