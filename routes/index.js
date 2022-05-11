const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/profile", (req, res, next) => {
  res.render("profile.hbs");
});

const authRoutes = require("./auth.routes.js");
router.use("/auth", authRoutes);

module.exports = router;
