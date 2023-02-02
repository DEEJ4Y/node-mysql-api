const mysql = require("mysql");
const Books = require("../models/book");

let connection;

exports.connectDB = () => {
  connection = mysql.createConnection({
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_DEFAULT_DB || "NODETESTDB",
  });

  connection.query("SHOW TABLES", function (error, results, _fields) {
    if (error) throw error;

    if (results)
      console.log(`Connected to MySQL server @ ${connection?.config?.host}`);
  });
};

exports.getConnection = () => {
  return connection;
};

exports.initTables = () => {
  Books.createBookTable();
};
