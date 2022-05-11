const router = require("express").Router();
const bcrypt = require("bcryptjs/dist/bcrypt");
const UserModel = require("../models/User.model");

// GET  SIGNUP
router.get("/signup", (req, res, next) => {
  res.render("auth/signup.hbs");
});

// POST SIGNUP
router.post("/signup", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.render("auth/signup.hbs", {
      errorMensaje: "Tienes que rellenar los campos",
    });
    return;
  }

  try {
    const foundUser = await UserModel.findOne({ username: username });
    if (foundUser) {
      res.render("auth/signup.hbs", {
        errorMensaje: "El usuario ya existe",
      });
      return;
    }

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    const createUser = UserModel.create({
      username,
      password: hashPassword,
    });

    res.redirect("/auth/login");
  } catch (err) {
    next(err);
  }
});

//GET LOGIN

router.get("/login", (req, res, next) => {
  res.render("auth/login.hbs");
});

// POST LOGIN

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.render("auth/login.hbs", {
      errorMensaje: "Introduce los datos de login",
    });
    return;
  }

  try {
    const findUser = await UserModel.findOne({ username: username });
    if (!findUser) {
      res.render("auth/login.hbs", {
        errorMensaje: "No existe el usuario introducido",
      });
      return;
    }
    const checkPassword = await bcrypt.compare(password, findUser.password);
    if (!checkPassword) {
      res.render("auth/login.hbs", {
        errorMensaje: "La contraseña no es correcta.",
      });
      return;
    }

    req.session.user = findUser;
    // req.app.locals.userActive = true;

    res.redirect("/profile");
  } catch (err) {
    next(err);
  }
});

router.post("/logout", async (req, res, next) => {
  await req.session.destroy();
  //   req.app.locals.userActive = false;
  res.redirect("/auth/login");
});

module.exports = router;
