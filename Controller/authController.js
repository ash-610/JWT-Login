const mongoose = require('mongoose')
const userModel = require('../models/users')
const jwt = require('jsonwebtoken')

module.exports.get_signup =(req,res) => {
    res.render("signup");
}
module.exports.get_login = (req,res) => {
    res.render("login");
}
module.exports.get_logout = (req,res) => {
    res.cookie("jwt", "",{ maxAge : 1 })
    res.redirect("/");
}



maxAge = 24*60*60
function createToken(id) {
    return jwt.sign({id}, "This is my secret",{
        expiresIn : maxAge
    })
}

module.exports.post_signup = async (req,res) => {
    try {
        const user = await userModel.findOne({email : req.body.email})
        if(user){
            throw Error("This Email is already Registered")
        }

        const newUser = await userModel.create(req.body);
        const token = createToken(newUser._id)
        res.cookie("jwt",token,{ httpOnly : true , maxAge : maxAge*1000 })
        
        res.redirect("/profile");
 
    } catch (error) {
        console.log(error)
        res.send(error.message)
    }

}


module.exports.post_login = async (req,res) => {
    const { email , password } = req.body

    try {
        const user = await userModel.login(email , password)
        const token = createToken(user._id)
        res.cookie("jwt",token,{ httpOnly : true , maxAge : maxAge*1000 })
        res.redirect("/profile")
    }
    catch (error) 
    {
        console.log(error)
        res.send(error.message)
    }
}
