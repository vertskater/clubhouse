const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const db = require("../db/querys");

const alphaError = "must have Alphabetical characters.";
const lengthError = "must have at least 5 and max 30 characters";
const emailError = "must be of format example@mailserver.at";

const validateSchema = [
  body("forename")
    .isAlpha()
    .withMessage(`forename ${alphaError}`)
    .isLength({ min: 5, max: 30 })
    .withMessage(`forename ${lengthError}`)
    .trim(),
  body("surname")
    .isAlpha()
    .withMessage(`surname ${alphaError}`)
    .isLength({ min: 5, max: 30 })
    .withMessage(`surname ${lengthError}`)
    .trim(),
  body("email").isEmail().withMessage(`E-Mail ${emailError}`).trim(),
  body("password")
    .trim()
    .isLength({ min: 4 })
    .withMessage("password must have at least 12 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
    .withMessage(
      "Password must be at least 12 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character"
    ),
  body("pass-confirm")
    .trim()
    .custom((value, { req }) => value === req.body.password)
    .withMessage("passwords do not match!"),
];

const signUpGet = (req, res) => {
  res.render("sign-up", {
    title: "Create new Account",
    user: {},
  });
};

const signUpPost = [
  validateSchema,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const { forename, surname, email } = req.body;
      return res.render("sign-up", {
        title: "Sign-up Errors",
        errors: errors.array(),
        user: { forename: forename, surname: surname, email: email },
      });
    }
    try {
      const { forename, surname, email, password } = req.body;
      bcrypt.hash(password, 10, async (err, hashedPassword) => {
        if (err) return res.render("error-page", { title: "Error" });
        await db.postNewUser({
          forename: forename,
          surname: surname,
          email: email,
          password: hashedPassword,
        });
        res.redirect("/login");
      });
    } catch (err) {
      next(err);
    }
  }),
];

module.exports = {
  signUpGet,
  signUpPost,
};
