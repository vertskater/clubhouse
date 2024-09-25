const express = require("express");
const session = require("express-session");
const path = require("path");
const passport = require("passport");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// init express app
const app = express();

//init db as session store and set cookie lifetime
const sessionStore = require("./session/sessionStore");
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);
//set assets Path to public
const assetPath = path.join(__dirname, "public");
app.use(express.static(assetPath));
//set view engine to ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//use form-data (req.body)
app.use(express.urlencoded({ extended: true }));

//init passport
//TODO: inti passport strategy in config dir
require("./config/passport");
app.use(passport.session());
//Debugging passport
/*app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});*/
//add global if user logged in
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});
//routes
const indexRouter = require("./routes");
app.use(indexRouter);

app.get("/login-failure", (req, res) => {
  res.render("login", {
    errors: [{ msg: "Invalid Username or Password" }],
    title: "Login failed",
  });
});

const messagesRouter = require("./routes/messagesRouter");
app.use("/messages", messagesRouter);

app.use((err, req, res, next) => {
  console.log(err);
});

app.listen(PORT);
