const db = require("../db/querys");

const indexMessagesGet = async (req, res, next) => {
  try {
    const messages = await db.getLatestMessages();
    res.render("index", { messages });
  } catch (err) {
    next(err);
  }
};
const becomeMemberGet = (req, res) => {
  res.render("become-member");
};

const becomeMemberPost = async (req, res, next) => {
  try {
    const memberCodes = await db.getMemberCodes();
    const { membercode } = req.body;
    const validCode = memberCodes.filter((item) => item.code === membercode)[0];
    if (validCode) {
      const user = await db.getUserByEmail(req.user.email);
      await db.deleteMemberCode(validCode.code);
      await db.setUserMemberRole(user.id);
      res.redirect("/");
    }
    res.render("become-member", {
      errors: [{ msg: "Sorry, Code is not Valid" }],
    });
  } catch (err) {
    next(err);
  }
};

const memberCodes = async (req, res, next) => {
  try {
    const codes = await db.getMemberCodes();
    res.render("member-codes", {
      title: "Member codes",
      codes: codes,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  indexMessagesGet,
  becomeMemberGet,
  becomeMemberPost,
  memberCodes,
};
