const express = require('express');
const { check } = require('express-validator');

const booksControllers = require('../controllers/books-controllers');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();


router.get('/browse', booksControllers.getAllBooks);

//middleware, routes afret this requiere a token!!!
router.use(checkAuth);  // ne stavlja se () jer ce se sama pozvati

router.get('/user/:uid', booksControllers.getBooksByUserId);

router.get('/:bid', booksControllers.getBookByBookId);

router.post(
  '/',
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 }),
    check('author')
      .not()
      .isEmpty()
  ],
  booksControllers.createBook
);

router.patch(
  '/:bid',
  [
    check('title')
      .not()
      .isEmpty(),
    check('description').isLength({ min: 5 }),
    check('author')
      .not()
      .isEmpty()
  ],
  booksControllers.updateBook
);

router.delete('/:bid', booksControllers.deleteBook);

module.exports = router;
