const { validationResult } = require('express-validator');   
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }
  const { name, email, password, phone } = req.body;

  let existingUser
  try{
    existingUser = await User.findOne({email: email})
  }catch(err){
    const error = new HttpError('Signing up failed.',500)
    return next(error);
  }
 
  if(existingUser){
    const error = new HttpError('User exists already, please login instead or sign up with a new account.', 422);
    return next(error);
  }

  //hashing password
  let hashedPassword;
  try{
    hashedPassword = await bcrypt.hash(password, 12); 
  }catch(err){
    const error = new HttpError('Could not create user, please try again', 500);
    return next(error);
  }
  
  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    phone,
    books: []
  });

  try{
    await createdUser.save(); 
  }catch(err){
    const error = new HttpError('Signing up failed, please try again.', 500)
    return next(error);
  }
  
  res.status(201).json({userId: createdUser.id, email: createdUser.email});
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser
  try{
    existingUser = await User.findOne({email: email})
  }catch(err){
    const error = new HttpError('Logging in failed.', 500)
    return next(error);
  }
 
  if(!existingUser){
    const error = new HttpError('Invalid credentials, please try again.', 403)    
    return next(error)
  }
  
  let isValidPassword = false;
  try{
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  }catch(err){ 
    const error = new HttpError('Logging in failed, please check your credentials again.', 500)
    return next(error);
  }

  if(!isValidPassword){
    const error = new HttpError('Invalid credentials, please try again.', 403)    
    return next(error)
  }

  // generating the token
  let token;
  try{
    token = jwt.sign({userId:existingUser.id, email: existingUser.email},'super_secret_server_key', { expiresIn:'1h'} );   //return string token
  }catch(err){
    const error = new HttpError('Logging in failed, please try again.', 500)
    return next(error);
  }

  res.json({token: token});
};

const getUserByUserId = async (req, res, next) => {
  const userId = req.userData.userId;
  let user;

  try{
    user = await User.findById(userId);
  }catch(err){
    const error = new HttpError('Fetching user for specific id failed.', 500)
    return next(error);
  }

  if (!user) {
    return next(new HttpErrorr('Could not find any user for the provided id.', 404));
  }

  res.json({ user: user.toObject({getters: true})});
};

exports.signup = signup;
exports.login = login;
exports.getUserByUserId = getUserByUserId;
