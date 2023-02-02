const {
  getAllBooksController,
  createBookController,
  getBookByIdController,
  updateBookByIdController,
  deleteBookByIdController,
} = require("../controllers/book");

const router = require("express").Router({ mergeParams: true });

/**
 * Setup API routes for book.
 */
router.route("/").get(getAllBooksController).post(createBookController);
router
  .route("/:bookId")
  .get(getBookByIdController)
  .put(updateBookByIdController)
  .delete(deleteBookByIdController);

module.exports = router;
