const jwt = require('jsonwebtoken');
const userModel = require('../models/users')

const requireAuth = (req,res,next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token,"This is my secret" ,(err , decodedToken)=>{
            if(err){
                res.redirect("/login");
            }
            else{
                next();
            }
        })
    }
    else{
        res.redirect("/login");
    }
}

module.exports = requireAuth;