import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
    {
        username : {
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true,
            minlength : 3,
            index : true
        },
        email:{
            type : String,
            required : true,
            unique : true,
            trim : true,
            lowercase : true,
        },
        fullname :{
            type : String,
            required : true,
            trim : true,
            index : true
        },
        password :{
            type : String,
            required : [true, 'Password is required'],
            minlength : 6
        }
    },
    {
        timestamps : true
    }
);

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.verifyPassword = async function(password){
    return await bcrypt.compare(password, this.password); 
};

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        { 
            _id : this._id,
            email : this.email,
            username : this.username,
            fullname : this.fullname,
        }, // payload
        process.env.ACCESS_TOKEN_SECRET, // secret key
        { expiresIn : process.env.ACCESS_TOKEN_EXPIRY } // token expiry time
    );
}

const User = mongoose.model('User', userSchema);

export default User;