const isLogged = require("../middlewares/isLogged");

const router = require("express").Router();

router.get("/cat", isLogged, (req, res, next) => {

    res.render("main/cat.hbs")
})



module.exports = router;

