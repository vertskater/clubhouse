const { Router } = require("express");
const messagesRouter = Router();
const { isAuth, isAdmin } = require("./authMiddleware");

//TODO: ADD auth function if user or admin is logged in to permit routes
const messagesController = require("../controllers/messagesController");
messagesRouter.get("/new", isAuth, messagesController.newMessageGet);
messagesRouter.post("/new", isAuth, messagesController.newMessagePost);

messagesRouter.get(
  "/delete/:id",
  isAuth,
  isAdmin,
  messagesController.deleteMessage
);
module.exports = messagesRouter;
