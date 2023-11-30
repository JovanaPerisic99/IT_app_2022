const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const Book = require('../models/book');
const User = require('../models/user');
const HttpError = require('../models/http-error');

const getAllBooks = async (req,res,next) => {
  let books;

  try{
    books = await Book.find().populate('creator');
  }catch(err){
    const error = new HttpError('Getting books from database failed.', 500)
    return next(error);
  }

  if (!books || books.length === 0) {
    const error = new HttpError('Could not find any books.', 404);
    return next(error);
  }

  res.json({ books: books.map(b => b.toObject({getters:true}))});   
}

const getBooksByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let books;

  try{
    books = await Book.find({ creator: userId});
  }catch(err){
    const error = new HttpError('Fetching books for specific user failed.', 500)
    return next(error);
  }

  if (!books || books.length === 0) {
    return next(new HttpError('Could not find any books for the provided user id.', 404));
  }

  res.json({ books: books.map(b => b.toObject({getters:true}))});
};

const getBookByBookId = async (req, res, next) => {
  const bookId = req.params.bid;
  let book;

  try{
    book = await Book.findById(bookId);
  }catch(err){
    const error = new HttpError('Fetching book for specific id failed.', 500)
    return next(error);
  }

  if (!book) {
    return next(new HttpError('Could not find any book for the provided book id.', 404));
  }

  res.json({ book: book.toObject({getters: true})});
};

const createBook = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }

  const { title, author, genre, image, description } = req.body;

  const createdBook = new Book({
    title,
    author,
    genre,
    image,
    description,
    creator :req.userData.userId
  });
  
  let user;

  try{
    user = await User.findById(req.userData.userId);   //check if user is existing
  }catch(err){
    const error = new HttpError('Creating book failed, please try again.', 500)
    return next(error);
  }
  
  if(!user){
    const error = new HttpError('Could not find the creator of this book.', 404)
    return next(error);
  }

  //console.log('user in DB IS:', user);
  //console.log('book in DB is: ', createdBook);
  
  try{
    const session = await mongoose.startSession();
    session.startTransaction();
    await createdBook.save({session: session});
    user.books.push(createdBook);
    await user.save({session: session});
    await session.commitTransaction();
    //session.endSession();
    //session.killAllSessions();
  }catch(err){
    const error = new HttpError('Creating book failed DB, please try again.', 500)
    return next(error);
  }
  
  res.status(201).json({ book: createdBook });
};

const updateBook = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }

  const {title, description, genre, author, image} = req.body;
  const bookId = req.params.bid;
  let book;

  try{
    book = await Book.findById(bookId);
  }catch(err){
    const error = new HttpError('Updating book failed.', 500)
    return next(error);
  }

  // authorization
  if(book.creator.toString() !== req.userData.userId){
    const error = new HttpError('You are not allowed to update this book.', 401)
    return next(error);
  }

  book.title = title;
  book.author = author;
  book.genre = genre;
  book.image = image;
  book.description = description;
 
  try{
    await book.save();
  }catch(err){
    const error = new HttpError('Saving updated book failed.', 500)
    return next(error);
  }

  res.status(200).json({ book: book.toObject({getters: true}) });
};

const deleteBook = async (req, res, next) => {
  const bookId = req.params.bid;
  let book;

  try{
    book = await Book.findById(bookId).populate('creator');
  }catch(err){
    const error = new HttpError('Finding the book failed.', 500)
    return next(error);
  }

  if(!book){
    const error = new HttpError('Finding the book failed.', 404)
    return next(error);
  }

  // authorization
  if(book.creator.id !== req.userData.userId){
    const error = new HttpError('You are not allowed to delete this book.', 401)
    return next(error);
  }
  
  try{
    const session = await mongoose.startSession();
    session.startTransaction();
    await book.remove({session: session});
    book.creator.books.pull(book);
    await book.creator.save({session: session});
    await session.commitTransaction();
    //session.killAllSessions();
  }catch(err){
    const error = new HttpError('Deleting the book failed.', 500)
    return next(error);
  }

  res.status(200).json({ message: 'Deleted book.' });
};

exports.getAllBooks = getAllBooks;
exports.getBooksByUserId = getBooksByUserId;
exports.createBook = createBook;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;
exports.getBookByBookId = getBookByBookId;
