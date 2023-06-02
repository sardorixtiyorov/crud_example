const mysql = require("mysql2");

const pool = mysql.createConnection({
  host: "localhost",
  user: "root", // mysql
  password: "root",
  database: "tst",
});

module.exports = pool;
