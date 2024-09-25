const indexRouter = require("express").Router();
const passport = require("passport");
const { isAuth, isMember } = require("./authMiddleware");

//Homepage get
const indexController = require("../controllers/indexController");
indexRouter.get("/", indexController.indexMessagesGet);

//sign-up form GET, POST
const signUpController = require("../controllers/signUpController");
indexRouter.get("/sign-up", signUpController.signUpGet);
indexRouter.post("/sign-up", signUpController.signUpPost);

//log-in form GET, POST
const loginController = require("../controllers/loginController");
indexRouter.get("/login", loginController.loginGet);
indexRouter.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login-failure",
    successRedirect: "/",
  })
);
//log-out form GET
indexRouter.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

//become-member form GET, POST
indexRouter.get("/become-member", isAuth, indexController.becomeMemberGet);
indexRouter.post("/become-member", isAuth, indexController.becomeMemberPost);
indexRouter.get(
  "/become-member/codes",
  isAuth,
  isMember,
  indexController.memberCodes
);
module.exports = indexRouter;
