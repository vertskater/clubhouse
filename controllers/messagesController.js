const { body, validationResult } = require("express-validator");
const db = require("../db/querys");

const alphaError = "must have Alphabetical Characters.";
const lengthError = "must have at least 5 and max 20 characters";
const validationSchema = [
  body("title")
    .trim()
    .isAlpha()
    .withMessage(`title ${alphaError}`)
    .isLength({ min: 5, max: 20 })
    .withMessage(`title ${lengthError}`),
  body("message")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Text cannot be empty")
    .matches(/^[A-Za-z0-9\s]+$/)
    .withMessage("Text can only contain letters, numbers, and spaces"),
];

const newMessageGet = (req, res) => {
  res.render("new-message", { title: "Add new message" });
};

const newMessagePost = [
  validationSchema,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const { title, message } = req.body;
      return res.render("new-message", {
        title: "Form Error",
        errors: errors.array(),
        message: { title, message },
      });
    }
    try {
      const user = await db.getUserByEmail(req.user.email);
      const message = {
        title: req.body.title,
        message: req.body.message,
        user_id: user.id,
      };
      await db.addNewMessagePost(message);
      res.redirect("/");
    } catch (err) {
      next(err);
    }
  },
];

const deleteMessage = async (req, res, next) => {
  try {
    const messageId = req.params.id;
    await db.deleteMessage(messageId);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  newMessageGet,
  newMessagePost,
  deleteMessage,
};
