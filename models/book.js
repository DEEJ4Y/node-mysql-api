const db = require("../loaders/db");

const bookColumns = ["id", "title", "description"];

exports.createBookTable = () => {
  const connection = db.getConnection();

  const query = `CREATE TABLE 
    IF NOT EXISTS 
    books (
      id int NOT NULL AUTO_INCREMENT,
      title varchar(255) NOT NULL,
      description varchar(255),
      PRIMARY KEY (id)
    )`;

  connection.query(query, (error, results, _fields) => {
    if (error) throw error;

    if (results) console.log("Initialized books table.");
  });
};

exports.getBookColumns = () => bookColumns;
