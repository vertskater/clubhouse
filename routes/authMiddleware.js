const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.render("not-authorized", {
    title: "not authorized",
    message: "Sorry, You are not authorized to view this content",
  });
};

const isAdmin = (req, res, next) => {
  if (req.user.role === "admin") {
    return next();
  }
  res.render("not-authorized", {
    title: "not authorized",
    message:
      "Sorry, You are not authorized to view this content, you must be a Admin",
  });
};

const isMember = (req, res, next) => {
  if (req.user.role === "member" || req.user.role === "admin") {
    return next();
  }
  res.render("not-authorized", {
    title: "not authorized",
    message: "Sorry, You are not authorized to view this content",
  });
};

module.exports = {
  isAuth,
  isMember,
  isAdmin,
};
