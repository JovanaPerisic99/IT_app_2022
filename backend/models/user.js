const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 6},
    phone: {type: String, required: true},
    books: [{type: mongoose.Types.ObjectId , required: true, ref: 'Book'}]
});

userSchema.plugin(uniqueValidator);  // for unique email
module.exports = mongoose.model('User', userSchema);