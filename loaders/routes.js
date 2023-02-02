const booksRouter = require("../routes/book");
const express = require("express");

/**
 * Initialize and assign top level routes to route handlers.
 *
 * @param {express.Application} app
 */
const initRoutes = (app) => {
  app.use("/books", booksRouter);
};

module.exports = initRoutes;
