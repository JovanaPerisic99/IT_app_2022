//middleware to check if there is a token and if it is a valid token
const jwt = require('jsonwebtoken')
const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS'){     //sometimes browser uses this insted of POST...
        return next();
    }

    try{
        const token = req.headers.authorization.split(' ')[1];  // Authorization: 'Bearer TOKEN'
        if(!token){
            throw new Error('Authentication failed!');
        }
        //verify the token
        const decodedToken = jwt.verify(token, 'super_secret_server_key'); //ako ne vrati error znaci sve je ok idi dalje sa next
        req.userData = {userId: decodedToken.userId}
        next();
    }catch(err){
        const error = new HttpError('Authentication failed!', 403);
        return next(error);
    }  
};