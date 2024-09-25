const pgPool = require("./pool");

module.exports = {
  postNewUser: async (user) => {
    await pgPool.query(
      "INSERT INTO users (forename, lastname, email, password) VALUES($1, $2, $3, $4)",
      [user.forename, user.surname, user.email, user.password]
    );
  },
  getUserCredentials: async (email) => {
    const { rows } = await pgPool.query(
      "SELECT id, email, password FROM users WHERE email=$1",
      [email]
    );
    return rows[0];
  },
  getUserById: async (id) => {
    const { rows } = await pgPool.query(
      "SELECT *, r.role FROM users as u JOIN roles as r ON u.role=r.id WHERE u.id=$1",
      [id]
    );
    return rows[0];
  },
  getUserByEmail: async (email) => {
    const { rows } = await pgPool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    return rows[0];
  },
  getLatestMessages: async (limit = 10) => {
    const { rows } = await pgPool.query(
      "SELECT m.*, u.forename, u.lastname FROM messages as m JOIN users as u ON m.user_id=u.id LIMIT $1",
      [limit]
    );
    return rows;
  },
  deleteMessage: async (id) => {
    await pgPool.query("DELETE FROM messages WHERE id=$1", [id]);
  },
  getMemberCodes: async () => {
    const { rows } = await pgPool.query("SELECT code FROM member_codes");
    return rows;
  },
  deleteMemberCode: async (code) => {
    await pgPool.query("DELETE FROM member_codes WHERE code=$1", [code]);
  },
  setUserMemberRole: async (userId, role = 2) => {
    await pgPool.query("UPDATE users SET role=$1 WHERE id=$2", [role, userId]);
  },
  addNewMessagePost: async (message) => {
    await pgPool.query(
      "INSERT INTO messages (title, message, user_id, date) VALUES ($1, $2, $3, CURRENT_DATE)",
      [message.title, message.message, message.user_id]
    );
  },
};
