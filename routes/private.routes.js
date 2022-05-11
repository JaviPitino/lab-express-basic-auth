const isLogged = require("../middlewares/isLogged");

const router = require("express").Router();

router.get("/", isLogged, (req, res, next) => {

    res.render("private/index.hbs")
})



module.exports = router;

