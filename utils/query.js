const db = require("../loaders/db");

/**
 * A function to convert a javascript object to columns and values for update queries.
 *
 * @param {object} obj The input object mapping columns to values.
 * @param {string[]} validColumns An array of strings representing column names.
 *
 * @returns {string} A safe column and value mapped string for update queries.
 */
exports.objectToUpdateQuery = (obj, validColumns) => {
  if (!obj) throw new Error("Object is undefined.");
  if (!validColumns) throw new Error("Valid columns is undefined.");

  const connection = db.getConnection();

  const columns = Object.keys(obj);
  let queryString = "";
  let first = true;

  columns.forEach((columnName) => {
    if (validColumns.includes(columnName)) {
      const cleanInput = connection.escape(obj[columnName]);

      if (first) {
        queryString += `${columnName} = ${cleanInput}`;
        first = false;
      } else {
        queryString += `, ${columnName} = ${cleanInput}`;
      }
    }
  });

  if (queryString === "") {
    console.log(`Query failed for: `, { obj, validColumns });
    return null;
  }

  return queryString;
};

/**
 * A function to convert a javascript object to columns and values for insert queries.
 *
 * @param {object} obj The input object mapping columns to values.
 * @param {string[]} validColumns An array of strings representing column names.
 *
 * @returns {string} A safe column and value mapped string for insert queries.
 */
exports.objectToInsertQuery = (obj, validColumns) => {
  if (!obj) throw new Error("Object is undefined.");
  if (!validColumns) throw new Error("Valid columns is undefined.");

  const connection = db.getConnection();

  const columns = Object.keys(obj);
  let queryStrings = { columns: "", values: "" };
  let first = true;

  columns.forEach((columnName) => {
    if (validColumns.includes(columnName)) {
      const cleanInput = connection.escape(obj[columnName]);

      if (first) {
        queryStrings.columns += columnName;
        queryStrings.values += cleanInput;

        first = false;
      } else {
        queryStrings.columns += `, ${columnName}`;
        queryStrings.values += `, ${cleanInput}`;
      }
    }
  });

  const finalString = `(${queryStrings.columns}) VALUES (${queryStrings.values})`;

  return finalString;
};
