const router = require("express").Router();
const bcrypt = require("bcryptjs/dist/bcrypt");
const UserModel = require("../models/User.model")

// GET  SIGNUP
router.get("/signup", (req, res, next) => {
    res.render("auth/signup.hbs")
})

// POST SIGNUP
router.post("/signup", async (req, res, next) => {

    const { username, password } = req.body

    if( !username || !password ) {
        res.render("auth/signup.hbs", {
            errorMensaje: "Tienes que rellenar los campos"
        })
        return;
    }

    try {
        const foundUser = await UserModel.findOne({ username: username })
        if ( foundUser ) {

            res.render("auth/signup.hbs", {
            errorMensaje: "El usuario ya existe"
            })
            return;
        } 

        const salt = await bcrypt.genSalt(12)
        const hashPassword = await bcrypt.hash(password, salt)

        const createUser = UserModel.create({
            username,
            password: hashPassword
        })

        res.redirect("/auth/login")

    } catch(err) {
        next(err)
    }
    
})

//GET LOGIN

// POST LOGIN



module.exports = router;