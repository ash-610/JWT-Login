const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect("mongodb://127.0.0.1:27017/jwt_self");

const userSchema = mongoose.Schema({
    first_name : String,
    last_name : String,
    email : {
        type : String,
        unique : true
    },
    password : String
});

userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password , salt)
    next();
})

userSchema.statics.login = async function (email,password){
    const user = await this.findOne({ email })
    if(user){
        const auth = await bcrypt.compare(password , user.password)
        if(auth){
            return user
        }
        else{
            throw Error("Wrong Password")
        }
    }
    else{
        throw Error("Email not registered")
    }
}


module.exports = mongoose.model("users" , userSchema);
