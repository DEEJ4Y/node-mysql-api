const booksRouter = require("../routes/book");

const initRoutes = (app) => {
  app.use("/books", booksRouter);
};

module.exports = initRoutes;
