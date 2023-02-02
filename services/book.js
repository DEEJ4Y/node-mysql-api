const db = require("../loaders/db");
const { getBookColumns } = require("../models/book");
const { objectToInsertQuery, objectToUpdateQuery } = require("../utils/query");

/**
 * Database query to get all books.
 *
 * @returns {Promise<null|any>}
 */
exports.getAllBooksService = () => {
  return new Promise((resolve) => {
    const connection = db.getConnection();

    const query = `SELECT * FROM books`;

    connection.query(query, (error, results, _fields) => {
      if (error) return resolve(null);

      resolve(results);
    });
  });
};

/**
 * Database query to create a book.
 *
 * @param {object} values Object with column:value mapped data.
 *
 * @returns {Promise<null|any>}
 */
exports.createBookService = (values) => {
  return new Promise((resolve, reject) => {
    if (!values) reject(new Error("values is undefined."));

    const connection = db.getConnection();

    const bookColumns = getBookColumns().slice(1);

    const safeValues = objectToInsertQuery(values, bookColumns);

    const query = `INSERT INTO books ${safeValues}`;

    connection.query(query, (error, results, _fields) => {
      if (error) return resolve(null);

      resolve(results);
    });
  });
};

/**
 * Database query to get a book by its id.
 *
 * @param {string} id id of the book.
 *
 * @returns {Promise<null|any>}
 */
exports.getBookByIdService = (id) => {
  return new Promise((resolve, reject) => {
    if (!id) reject(new Error("id is undefined."));

    const connection = db.getConnection();

    const bookColumns = getBookColumns();
    bookColumns.shift();

    const safeId = connection.escape(id);

    const query = `SELECT * FROM books WHERE id = ${safeId}`;

    connection.query(query, (error, results, _fields) => {
      if (error) return resolve(null);

      resolve(results);
    });
  });
};

/**
 * Database query to update a book by its id.
 *
 * @param {string} id id of the book.
 * @param {object} updateObj Object with column:value mapped data.
 *
 * @returns {Promise<null|any>}
 */
exports.updateBookByIdService = (id, updateObj) => {
  return new Promise((resolve, reject) => {
    if (!id) reject(new Error("id is undefined."));
    if (!updateObj) reject(new Error("Update object is undefined."));

    const connection = db.getConnection();

    const bookColumns = getBookColumns().slice(1);

    const safeId = connection.escape(id);
    const safeValues = objectToUpdateQuery(updateObj, bookColumns);

    if (!safeValues) return resolve(null);

    const query = `UPDATE books SET ${safeValues} WHERE id = ${safeId}`;

    connection.query(query, (error, results, _fields) => {
      if (error) return resolve(null);

      resolve(results);
    });
  });
};

/**
 * Database query to delete a book by its id.
 *
 * @param {string} id id of the book.
 *
 * @returns {Promise<null|any>}
 */
exports.deleteBookByIdService = (id) => {
  return new Promise((resolve, reject) => {
    if (!id) reject(new Error("id is undefined."));

    const connection = db.getConnection();

    const safeId = connection.escape(id);

    const query = `DELETE FROM books WHERE id = ${safeId}`;

    connection.query(query, (error, results, _fields) => {
      if (error) return resolve(null);

      resolve(results);
    });
  });
};
