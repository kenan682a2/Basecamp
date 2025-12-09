export default {
  schema: "./models/**/*.js",
  out: "./migrations",
  driver: "better-sqlite3",
  dbCredentials: {
    url: "./db.sqlite"
  }
};
