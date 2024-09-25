const { Client } = require("pg");

const SQL = `
    CREATE TABLE IF NOT EXISTS roles
    (
        id   INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        role VARCHAR(100) UNIQUE
    );
    INSERT INTO roles (role)
    VALUES ('user'),
           ('member'),
           ('admin');

    CREATE TABLE IF NOT EXISTS users
    (
        id       INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        forename VARCHAR(100),
        lastname VARCHAR(100),
        email    VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role     INTEGER      NOT NULL DEFAULT 1,
        CONSTRAINT fk_role FOREIGN KEY (role) REFERENCES roles (id)
    );
    CREATE TABLE IF NOT EXISTS messages
    (
        id      INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        title   VARCHAR(255),
        message VARCHAR(255),
        user_id INTEGER NOT NULL,
        date    DATE,
        CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id)
    );
    INSERT INTO messages (title, message, user_id, date)
    VALUES ('Hello', 'Hi there, this is my first message', 1, CURRENT_DATE),
           ('My Message', 'This is another message to you', 1, CURRENT_DATE)
    ;
    CREATE TABLE IF NOT EXISTS member_codes
    (
        id   INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        code VARCHAR(255) NOT NULL DEFAULT gen_random_uuid()
    )
`;

const SQL2 = `
    INSERT INTO member_codes (code)
    VALUES (gen_random_uuid());
`;
require("dotenv").config();

async function main() {
  console.log("seeding...");
  const host = process.env.HOST;
  const client = new Client({
    connectionString: `postgresql://clubhouse:geheim@${host}:5432/clubhouse`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
