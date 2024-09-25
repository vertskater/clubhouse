const loginGet = (req, res) => {
  res.render("login", {
    title: "Login",
  });
};

module.exports = {
  loginGet,
};
