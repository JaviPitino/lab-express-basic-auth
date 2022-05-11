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

const mainRoutes = require("./main.routes")
router.use("/main", mainRoutes)

const privateRoutes = require("./private.routes")
router.use("/private", privateRoutes)

module.exports = router;
